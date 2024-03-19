"use strict";
import {
  Model
} from 'sequelize';
const createMeetingsModel = (sequelize, DataTypes) => {
  /**
 * @extends {Model<import('../src/types/meeting').IMeetingRecords, any>}
 * @implements {import('../src/types/meeting').IMeetingRecords}
 */
  class meetings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meetings.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    meeting_start: DataTypes.STRING,
    meeting_end: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'meetings',
  });

  return meetings;

};
export default createMeetingsModel