import { Schema, Types } from "mongoose";
import mongoose from "mongoose";

export interface IResources {
  name: string;
  amount: number;
  _id?: Types.ObjectId;
}

const OrganizationsSchema:Schema = new mongoose.Schema({
  name: { type: String, required: [true, "please add the organizationName"]} as object,
  resources: { type: [{name:String, amount:Number}] }as object,
  budget: {type: Number}
});

export interface IOrganizations{
  name: string;
  resources: [IResources];
  budget: number
  _id?: Types.ObjectId;
}

export default mongoose.model("Organizations", OrganizationsSchema);