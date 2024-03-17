'use strict';
import {
    Model
} from 'sequelize';
const createUserMeetingRelationshipModel = (sequelize, DataTypes) => {
    /**
   * @extends {Model<import('../src/types/user').IUserMeeting, any>}
   * @implements {import('../src/types/user').IUserMeeting}
   */
    class UserMeetingRelationship extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserMeetingRelationship.init({
        target_user_id: DataTypes.INTEGER,
        source_user_id: DataTypes.INTEGER,
        meeting_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'MeetingUserRelationship',
        tableName: 'MeetingUserRelationship',
    });

    return UserMeetingRelationship;

};
export default createUserMeetingRelationshipModel