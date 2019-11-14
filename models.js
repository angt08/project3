// inside models.js
const { Sequelize } = require('sequelize');
// for heroku here

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    define: {
      underscored: true
    }
  });
} else {
  sequelize = new Sequelize({
    database: 'giftbox_db',
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  });
}

//
// Create a variable that is a connection to the database.
// const sequelize = new Sequelize({
//   database: 'giftbox_db',
//   dialect: 'postgres',
//   define: {
//     underscored: true
//   }
// });

class User extends Sequelize.Model { }

User.init({
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password_digest: Sequelize.STRING
}, {
  sequelize,
  modelName: 'user'
})

class GiftList extends Sequelize.Model { }

GiftList.init({
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  image_link: Sequelize.TEXT,
  due_date: Sequelize.DATE
},
  {
    sequelize,
    modelName: 'giftlist'
  })
class Gift extends Sequelize.Model { }

Gift.init({
  item: Sequelize.STRING,
  description: Sequelize.TEXT,
  image_link: Sequelize.TEXT,
  price: Sequelize.DECIMAL,
  location: Sequelize.TEXT,
  proposed_purchase_date: Sequelize.DATE,
  actual_purchase_date: Sequelize.DATE
},
  {
    sequelize,
    modelName: 'gift'
  })


User.hasMany(GiftList, { onDelete: 'cascade' });
GiftList.belongsTo(User);
GiftList.hasMany(Gift, { onDelete: 'cascade' });
Gift.belongsTo(GiftList);


module.exports = {
  User,
  GiftList,
  Gift,
  sequelize
}
