import { updateMetadata } from '../src/metadata.js';

import path from 'path';
const __dirname = path.resolve();

/**
 * Example route that would be invoked when an external data source changes. 
 * This example calls a common `updateMetadata` method that pushes static
 * data to Discord.
 */

export async function discordUpdateMetadata(request, response) {
  try {
    const userId = request.body.userId;
    await updateMetadata(userId, request.app)

    response.status(200).sendFile(path.join(__dirname, '/pages/frontend/', '200.html'));
  } catch (e) {
    response.status(500).sendFile(path.join(__dirname, '/pages/frontend/', '500.html'));
  }
}