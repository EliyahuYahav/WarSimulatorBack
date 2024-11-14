import { Schema, Types } from "mongoose";
import mongoose from "mongoose";

type IArea = "North" | "South" | "Center" | "West Bank"

const UserSchema:Schema = new mongoose.Schema({
  name: { type: String, required: [true, "please add the username"], unique: [true, "username already exists"], trim: true } as object,
  password: { type: String, required: [true, "please add the password name"], unique: [true, "password already exists"], trim: true} as object,
  organization: { type: Types.ObjectId, ref: 'Organizations'} as object,
  nameOrg:{type:String},
  area: { type: String } as object,
});

export interface IUser{
  name: string;
  password: string;
  organization?: Types.ObjectId;
  nameOrg?:string
  area?: IArea;
  _id?: Types.ObjectId;
}



export default mongoose.model("User", UserSchema);