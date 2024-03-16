
import { DataTypes } from "sequelize";
import MeetingsModel from "../../models/meetings";
import sequelize from "@/db/init";

const Meetings = MeetingsModel(sequelize, DataTypes);
export { Meetings };

Meetings.findAll().then(res =>{ 
    res[0]
})