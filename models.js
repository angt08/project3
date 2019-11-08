// inside models.js
const { Sequelize } = require('sequelize');

// Create a variable that is a connection to the database.
const sequelize = new Sequelize({
  database: 'giftbox_db',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

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
// User.username.unique = true;
// User.hasMany(Post, { onDelete: 'cascade' });
// Post.belongsTo(User);


module.exports = {
  User,
  sequelize
}
