const { Router } = require('express');
const { Gift, GiftList } = require('../models');
const gifts = Router({ mergeParams: true });

gifts.get('/', async (req, res) => {
  const giftlistId = req.params.giftListId;
  const gifts = await Gift.findAll({ where: { giftlistId } })
  res.json({ gifts })
})

gifts.get('/:id', async (req, res) => {
  const id = req.params.id
  const gift = await Gift.findByPk(id)
  res.json({ gift })
})


gifts.post('/', async (req, res, next) => {
  try {
    const id = req.params.giftListId;
    const data = req.body;
    const giftlist = await GiftList.findByPk(id);
    const gift = await Gift.create(data)
    gift.setGiftlist(giftlist);
    res.json({ gift })
  } catch (e) {
    next(e)
  }
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
    where: { id: req.params.id }
  })
  res.json({
    message: "You've removed your gift item!"
  })
})


module.exports = gifts;