import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

const app = express();

// Serve static files
app.use(express.static('dist/public'));

app.get('*', (req, res) => {
    const content = renderToString(<App />);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="/public/main.css" />
            <title>React SSR with vanilla-extract</title>
        </head>
      <body>
        <div id="root">${content}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;

    res.send(html);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
