import config from '../src/config.js';

export function base(request, response) {
  response.redirect(config.DISCORD_GUILD_LINK);
}