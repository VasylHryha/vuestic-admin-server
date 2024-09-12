const path = require('path');

const getRootController = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
};

module.exports = { getRootController };
