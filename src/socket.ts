import { Server } from "socket.io";
import { Server as HTTPServer } from 'http';
import Organizations from "./modules/organizationMoudle";

let socketOn: boolean = false;

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
        await Organizations.findOneAndUpdate(
          { 
            name: organization, 
            "resources.name": missile, 
            "resources.amount": { $gt: 0 }
          },
          { 
            $inc: { "resources.$.amount": -1 }
          }
        );        
      });
      socket.broadcast.emit('StartAttack', );
    });
  }
};
