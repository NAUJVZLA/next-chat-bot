
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function SocketHandler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar que res.socket y res.socket.server existen
  if (!res.socket?.server) {
    res.end();
    return;
  }

  // Verificar si Socket.io ya está inicializado
  if (res.socket.server.io) {
    console.log('Socket.io server is already running');
    res.end();
    return;
  }

  // Inicializar Socket.io
  console.log('Initializing Socket.io server');
  
  const httpServer = res.socket.server as HTTPServer;
  const io = new SocketIOServer(httpServer, {
    path: 'pages/api/socket_io',
    addTrailingSlash: false,
  });

  res.socket.server.io = io;

  // Manejar conexiones de clientes
  io.on('connection', (socket: Socket) => {
    console.log('New client connected', socket.id);

    socket.on('message', (msg: string) => {
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });

  res.end();
}


