import express, { Router } from "express";
import { GetMissileById, GetOrganizationById } from "../controllers/organizationController";


const router: Router = express.Router();

router.route('/organization/:name').get(GetOrganizationById);

router.route("/missiles/:name").get(GetMissileById);


export default router;