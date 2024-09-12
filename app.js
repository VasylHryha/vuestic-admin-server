const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
