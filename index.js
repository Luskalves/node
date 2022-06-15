const express = require('express');
const bodyParser = require('body-parser');
// const authMiddleware = require('./auth-middleware');


const app = express();
app.use(bodyParser.json());
// app.use(authMiddleware);

app.get('/open', function (req, res) {
  res.send('open!')
});

const recipesRouter = require('./recipesRouter');

app.use('/recipes', recipesRouter);

app.all('*', (req, res) => {
  return res.status(404).json({ message: `Rota '${req.path}' não existe!` })
})

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001')
});
