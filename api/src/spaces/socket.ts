import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import config from 'config';
import { logger } from '../utils';
import { ENTERED_SPACE, ME } from './types';
import { nanoid } from 'nanoid';

const clientUrl = config.get<string>('clientUrl');

let io: null | SocketServer;

export function initSocketServer(server: Server) {
  io = new SocketServer(server, {
    cors: {
      origin: clientUrl,
      methods: ['GET', 'POST'],
    },
  });

  io?.on('connection', socket => {
    console.log('a user connected', socket.id);
    socket.emit(ME, nanoid(20));
    socket.on(ENTERED_SPACE, s => {
      console.log({ s: s });
    });
  });
}

export { io };
