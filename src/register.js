import fetch from 'node-fetch';
import config from './config.js';

/**
 * Register the metadata to be stored by Discord. This should be a one time action.
 * Note: uses a Bot token for authentication, not a user token.
 */
const url = `https://discord.com/api/v10/applications/${config.DISCORD_CLIENT_ID}/role-connections/metadata`;
// supported types: number_lt=1, number_gt=2, number_eq=3 number_neq=4, datetime_lt=5, datetime_gt=6, boolean_eq=7, boolean_neq=8
const body = [
  {
    key: 'contributions_wwebjs_repo',
    name: 'Library Contributions',
    description: 'Required contributions on the whatsapp-web.js repository',
    type: 2,
  },
  {
    key: 'contributions_guide_repo',
    name: 'Guide Contributions',
    description: 'Required contributions on the wwebjs repository',
    type: 2,
  },
  {
    key: 'verified_account',
    name: 'Verified Account',
    description: 'Required account to be verified',
    type: 7,
  }

  /**
   * The verification process is as follows:
   * 1. The user must be active in the guild
   * 2. The user should't have any bad history
   */
];

const response = await fetch(url, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bot ${config.DISCORD_CLIENT_TOKEN}`,
  },
});

if (response.ok) {
  const data = await response.json();
  console.log(data);
} else {
  throw new Error(`Error pushing discord metadata schema: [${response.status}] ${response.statusText}`);
}
