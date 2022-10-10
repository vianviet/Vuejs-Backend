const userRoleModel = (sequelize, Datatypes) => {
  const userRole = sequelize.define(
    "User_Role",
    {
      user_id: {
        type: Datatypes.CHAR(30),
        primaryKey: true,
      },
      role_id: {
        type: Datatypes.CHAR(30),
        primaryKey: true,
      },
    },
    {
      timestamps: true,
      createdAt: "create_date",
      updatedAt: "update_date",
    }
  );
  return userRole;
};

module.exports = userRoleModel;
