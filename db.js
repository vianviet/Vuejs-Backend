const { Sequelize } = require("sequelize");
const messageModel = require("./Model/messageModel");
const roleModel = require("./Model/roleModel");
const roomModel = require("./Model/roomModel");
const roomUserModel = require("./Model/roomUserModel");
const userModel = require("./Model/userModel");
// const userRoleModel = require("./Model/userRoleModel");

const sequelize = new Sequelize("elaadmin", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);
db.message = messageModel(sequelize, Sequelize);
db.room = roomModel(sequelize, Sequelize);
// db.userRole = userRoleModel(sequelize, Sequelize);
db.room_user = roomUserModel(sequelize, Sequelize);

db.role.hasMany(db.user, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "role_id",
  },
});

db.user.belongsTo(db.role, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "role_id",
  },
});

db.message.belongsTo(db.room, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "room_id",
  },
});

db.room.hasMany(db.message, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "room_id",
  },
});

db.message.belongsTo(db.user, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "user_id",
  },
});

db.user.hasMany(db.message, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "user_id",
  },
});

db.room.belongsToMany(db.user, {
  foreignKey: "room_id",
  through: db.room_user,
});

db.user.belongsToMany(db.room, {
  foreignKey: "user_id",
  through: db.room_user,
});

module.exports = { db };
