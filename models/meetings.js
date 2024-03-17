'use strict';
import {
  Model
} from 'sequelize';
const createMeetingsModel = (sequelize, DataTypes) => {
  /**
 * @extends {Model<import('../src/types/meeting').IMeetings, any>}
 * @implements {import('../src/types/meeting').IMeetings}
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
    meeting_start: DataTypes.STRING,
    meeting_end: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'meetings',
  });

  return meetings;

};
export default createMeetingsModel