import { Schema, Types } from "mongoose";
import mongoose from "mongoose";


const OrganizationsSchema:Schema = new mongoose.Schema({
  name: { type: String, required: [true, "please add the organizationName"]} as object,
  resources: [{ type: Types.ObjectId, ref: 'Resources'}] as object,
  budget: {type: Number}
});

export interface IOrganizations{
  name: string;
  resources: [Types.ObjectId];
  budget: number
  _id?: Types.ObjectId;
}

export default mongoose.model("Organizations", OrganizationsSchema);