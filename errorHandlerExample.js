const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs/promises');

const app = express();

app.get('/:fileName', 
  rescue(async (req, res) => {
      const file = await fs.readFile(`./${req.params.fileName}`);
      res.send(file.toString('utf-8'));
  })
);

app.use(function (err, _req, res, _next) {
  res.status(500).json({ error: `ERROR: ${err.message}` })
});

app.listen(3002, () => {
  console.log('ouvindo na porta 3002');
});
