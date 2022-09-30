const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
const Profile = sequelize.define(
  "profile",
  {
    name: DataTypes.STRING,
  },
  { timestamps: false }
);
const User_Profile = sequelize.define(
  "User_Profile",
  {},
  { timestamps: false }
);
(async () => {
  await User.sync();
  await Profile.sync();
  await User.belongsToMany(Profile, { through: "User_Profiles" });
  await Profile.belongsToMany(User, { through: "User_Profiles" });
  await User_Profile.sync();
})();

module.exports = { User, Profile };
