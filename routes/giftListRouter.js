const { Router } = require('express');
const { User, Gift, GiftList, sequelize } = require('../models');
const { hashPassword, genToken, checkPassword } = require('../services/auth');

const giftListRouter = Router();

// route for all giftlists user owns
giftListRouter.get("/", async (req, res) => {
  const giftlists = await GiftList.findAll();
  res.json({ giftlists })
})


// get giftlist  fin by pk
giftListRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const giftlists = await GiftList.findAll({
    where: {
      user_id: id
    }
  });
  res.json({ giftlists })
})

// create new giftlist 
giftListRouter.post("/:id", async (req, res) => {
  console.log("here")
  const data = req.body
  const userId = req.params.id
  const user = await User.findByPk(userId)
  const giftlist = await GiftList.create(data)
  giftlist.setUser(user)
  res.json({ giftlist })
})

//
giftListRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const data = req.body
  const giftlist = await GiftList.findByPk(id)
  await giftlist.update(data)

  res.json({ giftlist })
})

giftListRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const giftlist = await GiftList.findByPk(id)
  try {
    const post = await giftlist.destroy()
    res.json(giftlist)
  } catch (e) {
    next(e)
  }
})

module.exports = giftListRouter;
