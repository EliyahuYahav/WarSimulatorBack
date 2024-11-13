import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { changeStatus } from './controllers/functionForSocket';

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('join', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on('leave', (room) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });

    // Broadcast to a room
    socket.on('change-status', (room, id, massage) => {
      changeStatus(id, massage)
      io.to(room).emit('room-message', massage);
    });

    // Acknowledgement example
    socket.on('request', (data, callback) => {
      console.log('Request received', data);
      callback({ status: 'OK' });  // Acknowledge the request
    });

    // Volatile event example (heartbeat)
    setInterval(() => {
      socket.volatile.emit('heartbeat', { time: new Date().toISOString() });  // Emit heartbeat every second
    }, 1000);

    socket.on('disconnect', (reason) => {
      console.log('A user disconnected', socket.id, 'reason:', reason);
    });
  });

  return io;
}