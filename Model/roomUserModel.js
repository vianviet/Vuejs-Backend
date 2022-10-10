const roomUserModel = (sequelize, Datatypes) => {
  const roomUser = sequelize.define(
    "Room_Users",
    {
      room_id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: true,
      createdAt: "create_date",
      updatedAt: "update_date",
    }
  );
  return roomUser;
};

module.exports = roomUserModel;
