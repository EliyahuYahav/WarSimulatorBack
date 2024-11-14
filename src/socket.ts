import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import Organizations, { IOrganizations, IResources } from "./modules/organizationMoudle";
import { IMissile } from "./modules/missileMoudle";
import Missile from "./modules/missileMoudle"

let socketOn: boolean = false;

const RetuneAmount = async (organization: string, missile:string)=>{
  const newOrganizations: IOrganizations | null= await Organizations.findOne({name: organization})
  const correctMissile:IResources | undefined = newOrganizations?.resources.find((miss)=>{ return miss.name == missile})
  return correctMissile?.amount
}

export const StartSocket = (httpServer: HTTPServer) => {
  if (!socketOn) {
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    socketOn = true;
    io.on("connection", (socket) => {
      socket.on("StartAttack", async ({ missile, organization }) => {
      await Organizations.updateOne({ name: organization, "resources.name": missile, "resources.amount": { $gt: 0 }, },{
            $inc: { "resources.$.amount": -1 },trim: true, });
      await Missile.updateOne({name: missile, $set: {"status": "launched"}})
        socket.emit(
          "amount-left", await RetuneAmount(organization, missile)
        );
      });
    });
  }
};


