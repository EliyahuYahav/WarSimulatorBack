import { Schema, Types } from "mongoose";
import mongoose from "mongoose";


const ResourcesSchema:Schema = new mongoose.Schema({
  missileName: { type: String, required: [true, "please add the missileName"]} as object,
  amount: { type: Number } as object,
});

export interface IResources{
    missileName: string;
    amount: Types.ObjectId;
    _id?: Types.ObjectId;
}

export default mongoose.model("Resources", ResourcesSchema);