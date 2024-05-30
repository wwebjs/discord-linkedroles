import * as discord from '../src/discord.js';

/**
 * Route configured in the Discord developer console which facilitates the
 * connection between Discord and any additional services you may use. 
 * To start the flow, generate the OAuth2 consent dialog url for Discord, 
 * and redirect the user there.
 */

export function verify(request, response) {
  const { url, state } = discord.getOAuthUrl();

  // Store the signed state param in the user's cookies so we can verify
  // the value later. See:
  // https://discord.com/developers/docs/topics/oauth2#state-and-security
  response.cookie('clientState', state, { maxAge: 1000 * 60 * 5, signed: true });

  // Send the user to the Discord owned OAuth2 authorization endpoint
  response.redirect(url);
};