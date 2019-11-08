const { Router } = require('express');
const { Gift, GiftList } = require('../models');
const gifts = Router();

gifts.get('/', async (req, res) => {
  const giftlistId = req.params.giftlistId;
  const gifts = await Gift.findAll({ where: { giftlistId } })
  res.json({ gifts })
})

gifts.get('/:id', async (req, res) => {
  const id = req.params.id
  const gift = await Gift.findByPk(id)
  res.json({ gift })
})


gifts.post('/', async (req, res) => {
  const id = req.params.giftlistId;
  const data = req.body;
  const giftlist = GiftList.findByPk(id);
  const gift = Gift.create(data)
  gift.setGiftList(giftlist);
  res.json({gift})
})


gifts.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  const gift = await Gift.findByPk(id)
  await gift.update(data);
  
  // await Gift.update(data, {
  //   where: { id }
  // });
  // const gift = await Gift.findByPk(id)
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