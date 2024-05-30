import * as discord from '../src/discord.js'
import * as storage from '../src/storage.js';
import { updateMetadata } from '../src/metadata.js';

import path from 'path';
const __dirname = path.resolve();

/**
 * Route configured in the Discord developer console, the redirect Url to which
 * the user is sent after approving the bot for their Discord account. This
 * completes a few steps:
 * 1. Uses the code to acquire Discord OAuth2 tokens
 * 2. Uses the Discord Access Token to fetch the user profile
 * 3. Stores the OAuth2 Discord Tokens in Redis / Firestore
 * 4. Lets the user know it's all good and to go back to Discord
 */

export async function discordOauthCallback(request, response) {
  try {
    // 1. Uses the code and state to acquire Discord OAuth2 tokens
    const code = request.query['code'];
    const discordState = request.query['state'];

    // make sure the state parameter exists
    const { clientState } = request.signedCookies;
    if (clientState !== discordState) {
      console.error('State verification failed.');
      return response.status(403).sendFile(path.join(__dirname, '/pages/frontend/', '403.html'));
    }

    const tokens = await discord.getOAuthTokens(code);

    // 2. Uses the Discord Access Token to fetch the user profile
    const meData = await discord.getUserData(tokens);
    const userId = meData.user.id;
    await storage.storeDiscordTokens(userId, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + tokens.expires_in * 1000,
    });

    // 3. Check if the user has not linked their Discord account with GitHub
    const linked = await discord.getUsersGithubConnection(tokens);
    if (!linked) {
      response.status(400).sendFile(path.join(__dirname, '/pages/frontend/', '400.html'));
    }

    // 4. Update the users metadata, assuming future updates will be posted to the `/update-metadata` endpoint
    await updateMetadata(userId, request.app);

    response.status(200).sendFile(path.join(__dirname, '/pages/frontend/', '200.html'));
  } catch (e) {
    console.error(e);
    response.status(500).sendFile(path.join(__dirname, '/pages/frontend/', '500.html'));
  }
}