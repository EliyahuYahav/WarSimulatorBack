import { Schema, Types } from "mongoose";
import mongoose from "mongoose";


const ResourcesSchema:Schema = new mongoose.Schema({
  name: { type: String, required: [true, "please add the missileName"]} as object,
  amount: { type: Number } as object,
});

export interface IResources{
  name: string;
    amount: Types.ObjectId;
    _id?: Types.ObjectId;
}

export default mongoose.model("Resources", ResourcesSchema);