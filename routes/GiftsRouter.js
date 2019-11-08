const { GiftsRouter } = require('express');
const gifts = Router();
const { Gift } = require('../models');

gifts.get('/', async (req, res) => {
  const gifts = await Gift.findAll()
  res.json({
    gifts
  })
})


gifts.post('/', async (req, res) => {
  const gift = Gift.create(req.body)
  res.json({hero})
})


gifts.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await Gift.update(data, {
    where: { id }
  });
  const gift = await Gift.findByPk(id)
  res.json({ gift });
})


gifts.delete('/:id', async (req, res) => {
  await Gift.destroy({
    where: { id: req.params.id}
  })
  res.json({
    message: "You've removed your gift item!"
  })
})


module.exports = gifts;