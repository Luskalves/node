const express = require('express');
const router = express.Router();

const recipes = [
  { id: 1, name: 'Lasanha', preco: 40.0, tempoDePreparo: 30 },
  { id: 2, name: 'Macarrão a Bolonhesa', preco: 35.0, tempoDePreparo: 25 },
  { id: 3, name: 'Macarrão com molho branco', preco: 35.0, tempoDePreparo: 25 },
];

function validateNames(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: 'Invalid data'});

  next();
}

router.get('/', (req, res) => {
  res.status(200).json(recipes);
});

router.get('/', (req, res) => {
  const { name, maxPrice } = req.query;
  const fillteredRecipes = recipes.filter((r) => r.name.includes(name) 
    && r.preco <= maxPrice);
  
  res.status(200).json(fillteredRecipes);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const recipe = recipes.findIndex((r) => r.id === Number(id));
  if (!recipe) return res.status(404).json({ message: 'Recipe not found! '})

  res.status(200).json(recipe);
})

router.post('/', validateNames, (req, res) => {
  const { id, name, price } = req.body;
  recipes.push({ id, name, price });

  res.status(201).json({ message: 'Recipe created successfully' });
});

router.put('/:id', validateNames, (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const recipeIndex = recipes.findIndex((r) => r.id === Number(id));

  if (recipeIndex === -1) return res.status(500).json({ message: 'Recipe not found!' });

  recipes[recipeIndex] = {...recipes[recipeIndex], name, price };

  res.status(204).end();
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((r) => r.id === Number(id));

  if (recipeIndex === -1) return res.status(500).json({ message: 'Recipe not found!' });

  recipes.splice(recipeIndex, 1);

  res.status(204).end();
})

module.exports = router;
