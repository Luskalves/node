const express = require('express');
const fs = require('fs');

const app = express();

app.get('/:filename', async (req, res, next) => {
    try {
      const file = await fs.readFile(`./${req.params.filename}`);
      res.send(file.toString('utf-8'))
    } catch (e) {
      next(e);
    }
})

app.use(function (err, _req, res, _next) {
  res.status(500).json({ error: `ERROR: ${err.message}` })
});

app.listen(3002, () => {
  console.log('ouvindo na porta 3002');
});
