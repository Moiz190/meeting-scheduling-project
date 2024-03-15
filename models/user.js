"use strict";
import { Model } from "sequelize";
const initUsers = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      availabilityStart: DataTypes.INTEGER,
      availabilityEnd: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  return User;
};
export default initUsers;
