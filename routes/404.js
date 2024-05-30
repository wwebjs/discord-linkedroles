import path from 'path';
const __dirname = path.resolve();

export function error404(request, response) {
  response.status(404).sendFile(path.join(__dirname, '/pages/frontend/', '404.html'));
}