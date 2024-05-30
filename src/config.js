import * as dotenv from 'dotenv'
import * as path from 'path'

/**
 * Load environment variables from a .env file in the root of the project. 
 */

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  PORT: process.env.PORT,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_LIBRARY_REPO_MAIN: process.env.GITHUB_LIBRARY_REPO_MAIN,
  GITHUB_LIBRARY_REPO_GUIDE: process.env.GITHUB_LIBRARY_REPO_GUIDE,
  DISCORD_GUILD_LINK: process.env.DISCORD_GUILD_LINK,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  DISCORD_CLIENT_TOKEN: process.env.DISCORD_CLIENT_TOKEN,
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  EXPRESS_COOKIE_SECRET: process.env.EXPRESS_COOKIE_SECRET,
  EXPRESS_RATELIMIT_WINDOW: process.env.EXPRESS_RATELIMIT_WINDOW,
  EXPRESS_RATELIMIT_MAX: process.env.EXPRESS_RATELIMIT_MAX,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB: process.env.MONGO_DB,
  MONGO_COLLECTION: process.env.MONGO_COLLECTION,
  MONGO_TIMEOUT: process.env.MONGO_TIMEOUT
};

export default config;