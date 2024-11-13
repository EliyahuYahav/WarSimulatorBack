import { Schema, Types } from "mongoose";
import mongoose from "mongoose";

type IArea = "North" | "South" | "Center" | "West Bank"

const UserSchema:Schema = new mongoose.Schema({
  username: { type: String, required: [true, "please add the username"], unique: [true, "username already exists"], trim: true } as object,
  password: { type: String, required: [true, "please add the password name"], unique: [true, "password already exists"], trim: true} as object,
  organization: { type: Types.ObjectId, ref: 'Organizations'} as object,
  area: { type: String } as object,
});

export interface IUser{
  username: string;
  password: string;
  organization: Types.ObjectId;
  area?: IArea;
  _id?: Types.ObjectId;
}



export default mongoose.model("User", UserSchema);