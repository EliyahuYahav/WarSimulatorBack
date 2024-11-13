import { Request, Response } from "express";
import { GetMissile, GetOrganization } from "../services/organizationService";

export const GetOrganizationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const newOrganizations = await GetOrganization(req.params.name)
      res.status(201).json({organization: newOrganizations})
    } catch (error) {
      res.status(409).json({ error: error });
    }
  };

  export const GetMissileById = async (req: Request, res: Response): Promise<void> => {
    try {
      const newMissile = await GetMissile(req.params.name)
      res.status(201).json({missile: newMissile})
    } catch (error) {
      res.status(409).json({ error: error });
    }
  };