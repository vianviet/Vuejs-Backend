const messageModel = (sequelize, DataTypes) => {
  const message = sequelize.define(
    "Message",
    {
      message: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "create_date",
      updatedAt: "update_date",
    }
  );
  return message;
};

module.exports = messageModel;
