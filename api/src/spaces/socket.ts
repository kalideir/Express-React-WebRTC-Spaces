import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import config from 'config';
import { logger } from '../utils';
import { ENTERED_SPACE, ME, JOIN_SPACE } from './types';
import { nanoid } from 'nanoid';
import { joinSpace } from '../services';
import { ParticipantStatus } from '../types';

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
    socket.on(ME, () => {
      socket.emit(ME, nanoid(25));
    });
    socket.on(ENTERED_SPACE, s => {
      console.log({ s: s });
    });
    socket.on(JOIN_SPACE, async ({ key, userId, type }: { key: string; userId: string; type: ParticipantStatus }) => {
      console.log({ key, userId, type });
      if (key && userId && type) {
        const space = joinSpace(key, userId, type);
        socket.emit(JOIN_SPACE, space);
      }
    });
  });
}

export { io };
