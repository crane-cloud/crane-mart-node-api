const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Crane Mart');
});

app.listen(3000);