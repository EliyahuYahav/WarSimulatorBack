import { Schema, Types } from "mongoose";
import mongoose from "mongoose";

export type Status = "idle" | "launched" | "intercepted" | "hit"

const MissileSchema:Schema = new mongoose.Schema({
  name: { type: String} as object,
  description: { type: String} as object,
  speed: { type: Number } as object,
  intercepts: {type:[String]},
  price: { type: Number } as object,
  status: {type:String , default: "idle"}
});

export interface IMissile {
  name: string;
  amount: Number;
  speed: Number;
  intercepts: [string]
  price: Number;
  status: Status,
  _id?: Types.ObjectId;
}

export default mongoose.model("Missile", MissileSchema);
