const getRoot = (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>REST API Demo Project</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { color: #333; }
            h2 { color: #666; }
            ul { list-style-type: none; padding-left: 0; }
            li { margin-bottom: 10px; }
            a { color: #0066cc; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <h1>REST API Demo Project</h1>
        <p>API для списка пользователей Vuestic <a href="https://admin-demo.vuestic.dev/users" target="_blank">users list</a></p>

        <h2>Примеры запросов:</h2>

        <ul>
            <li><strong>GET /users:</strong> <a href="/users?page=2&pageSize=5">/users?page=2&pageSize=5</a></li>
            <li><strong>GET /users/:id:</strong> <a href="/users/550e8400-e29b-41d4-a716-446655440000">/users/550e8400-e29b-41d4-a716-446655440000</a></li>
            <li><strong>POST /users:</strong> /users (POST запрос с JSON телом)</li>
            <li><strong>PUT /users/:id:</strong> /users/7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8 (PUT запрос с JSON телом)</li>
            <li><strong>DELETE /users/:id:</strong> /users/7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8 (DELETE запрос)</li>
        </ul>

        <p>Примечание: Для POST и PUT запросов отправляйте соответствующие JSON данные в теле запроса.</p>
    </body>
    </html>
  `;

  res.send(html);
};

module.exports = { getRoot };
