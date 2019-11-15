const { User, Gift, GiftList } = require('./models');
const { hashPassword } = require('./services/auth');
const main = async () => {
  // Delete everything in the database.
  await Gift.destroy({
    where: {}
  });
  await GiftList.destroy({
    where: {}
  });
  const userObj = {
    username: "admin",
    password: "admin"
  };
  const { username } = userObj;
  const password_digest = await hashPassword(userObj.password);
  const user = await User.create({
    username,
    password_digest,
  });

  const gl1 = await GiftList.create({
    "title": "Angies Mock Birthday",
    "description": "This is a sample celebration for Angie's not birthday",
    "image_link": "https://media.gettyimages.com/photos/birthday-cake-with-candles-lit-picture-id126551741?s=612x612",
    "due_date": "01/10/2020"
  });

  const gl2 = await GiftList.create({
    "title": "Zita's Day",
    "description": "This is a sample celebration for Zits's big day",
    "image_link": "https://edinburgh.anglican.org/wp-content/uploads/2018/02/the-big-day-twitter-avatar.png",
    "due_date": "01/12/2020"
  });

  const gift1 = await Gift.create({
    "item": "Paper",
    "description": "Paper",
    "image_link": "https://i.ytimg.com/vi/c0WwpEx-y64/maxresdefault.jpg",
    "price": "5.99",
    "location": "store",
    "proposed_purchase_date": "2019-12-01T05:00:00.000Z",
    "actual_purchase_date": null
  }
  );

  const gift2 = await Gift.create({
    "item": "Rock",
    "description": "Rock",
    "image_link": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Logan_Rock_Treen_closeup.jpg",
    "price": "115.99",
    "location": "Quary",
    "proposed_purchase_date": "2019-12-01T05:00:00.000Z",
    "actual_purchase_date": null
  });

  const gift3 = await Gift.create({
    "item": "Scissors",
    "description": "Scissors",
    "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/76/Pair_of_scissors_with_black_handle%2C_2015-06-07.jpg",
    "price": "9.99",
    "location": "Drawer",
    "proposed_purchase_date": "2019-12-01T05:00:00.000Z",
    "actual_purchase_date": null
  });

  // set associations here!
  await gl1.setUser(user);
  await gl2.setUser(user);
  await gift1.setGiftlist(gl1);
  await gift2.setGiftlist(gl2);
  await gift3.setGiftlist(gl1);
  process.exit();
};

main();