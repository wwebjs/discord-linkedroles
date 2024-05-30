import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

export default function (server) {
  const file = path.join(__dirname, 'express.json');
  if (!fs.existsSync(file)) {
    throw new Error('Settings file not found');
  }
  const settings = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const setting in settings) {
    server.set(setting, settings[setting]);
  }
}