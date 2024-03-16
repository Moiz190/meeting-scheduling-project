"use strict";
import { Model } from "sequelize";

const initUsers = (sequelize, DataTypes) => {
  /**
   * @extends {Model<import('../src/types/user').IUser, any>}
   * @implements {import('../src/types/user').IUser}
   */
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
      timeAvailabilityStart: DataTypes.INTEGER,
      timeAvailabilityEnd: DataTypes.INTEGER,
      DayAvailabilityStart: DataTypes.STRING,
      DayAvailabilityEnd: DataTypes.STRING,
      bufferTime: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  return User;
};
export default initUsers;
