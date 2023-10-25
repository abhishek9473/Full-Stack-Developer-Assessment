const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: "userId" });
      Notification.belongsTo(models.Task, { foreignKey: "taskId" });
    }
  }
  Notification.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      taskId: {
        type: DataTypes.INTEGER,
      },
      taskType: {
        type: DataTypes.ENUM("new", "update", "delete"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
