const roomModel = (sequelize, DataTypes) => {
  const room = sequelize.define(
    "Room",
    {
      code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "create_date",
      updatedAt: "update_date",
    }
  );
  return room;
};

module.exports = roomModel;
