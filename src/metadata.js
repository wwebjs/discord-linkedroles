import * as discord from './discord.js'
import * as storage from './storage.js';

export async function updateMetadata(userId, server) {
  // Fetch the Discord tokens from storage
  const tokens = await storage.getDiscordTokens(userId);

  // Get the user from the database
  const user = await getUserData(userId, tokens, server);

  try {
    // Fetch the new metadata you want to use from an external source. 
    // This data could be POST-ed to this endpoint, but every service
    // is going to be different.  To keep the example simple, we'll
    // just generate some random data. 
    const { contributions_wwebjs_repo = 0, contributions_guide_repo = 0, verified_account = false } = user;
    const metadata = { contributions_wwebjs_repo, contributions_guide_repo, verified_account };

    // Push the data to Discord.
    await discord.pushMetadata(userId, tokens, metadata);
  } catch (e) {
    e.message = `Error fetching external data: ${e.message}`;
    console.error(e);
    throw e;
  }
}

async function getUserData(userId, tokens, server) {
  try {
    const Mongo = server.get('mongo');
    const dbUser = await Mongo.getUser(userId) || {};

    const Github = server.get('github');
    const dcUser = await discord.getUsersGithubConnection(tokens)

    const wwebjsContributions = await Github.getLibContributions(dcUser.name);
    const guideContributions = await Github.getGuideContributions(dcUser.name);

    const contributions_wwebjs_repo = Math.max(dbUser?.contributions_wwebjs_repo ?? 0, wwebjsContributions);
    const contributions_guide_repo = Math.max(dbUser?.contributions_guide_repo ?? 0, guideContributions);
    const verified_account = dbUser?.verified_account;

    return { contributions_wwebjs_repo, contributions_guide_repo, verified_account };
  } catch (e) {
    e.message = `Error fetching user data: ${e.message}`;
    console.error(e);
    throw e;
  }
}