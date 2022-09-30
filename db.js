const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("elaadmin", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
const connectDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { sequelize, connectDB };
