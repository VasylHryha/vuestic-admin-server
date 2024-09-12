const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(router);

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
