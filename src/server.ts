import express, { Application } from "express";
import userRouter from './router/userRouter'
import organizationRoute from './router/organizationRoute'
import connectDb from "./config/db";
import dotenv from "dotenv";
import cp from "cookie-parser";
import cors from "cors"
import { createServer } from 'http';
import { initializeSocketServer } from "./socket";

dotenv.config();

const PORT : string|number = process.env.PORT || 3000;
const app: Application = express();

const httpServer = createServer(app);
const io = initializeSocketServer(httpServer);
connectDb();

app.use(express.json());
app.use(cp());
app.use(cors())


app.use('/api', userRouter)
app.use('/api', organizationRoute)

httpServer.listen(PORT, ()=>{console.log(`server listen on port ${PORT}.`)})