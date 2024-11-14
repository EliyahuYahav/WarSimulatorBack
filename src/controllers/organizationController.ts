import { Request, Response } from "express";
import { GetMissile, GetOrganization, GetAllMissile } from "../services/organizationService";

export const GetOrganizationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const newOrganizations = await GetOrganization(req.params.name)
      res.status(201).json(newOrganizations)
    } catch (error) {
      res.status(409).json({ error: error });
    }
  };

  export const GetMissileById = async (req: Request, res: Response): Promise<void> => {
    try {
      const newMissile = await GetMissile(req.params.name)
      res.status(200).json({missile: newMissile})
    } catch (error) {
      res.status(409).json({ error: error });
    }
  };

  export const GetAllMissiles = async (req:Request, res:Response):Promise<void> =>{
    try {
      const allMissile = await GetAllMissile()
      res.status(200).json(allMissile)
    } catch (error) {
      res.status(404).json({error:error})
    }
  }