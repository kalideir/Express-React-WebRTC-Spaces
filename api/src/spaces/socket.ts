import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import config from 'config';
import { logger } from '../utils';
import { ENTERED_SPACE, ME, JOIN_SPACE, SWITCH_PARTICIPANT_TYPE } from './types';
import { nanoid } from 'nanoid';
import { joinSpace, switchType } from '../services';
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
      if (key && userId && type) {
        const space = await joinSpace(key, userId, type);
        socket.emit(JOIN_SPACE, space);
      }
    });

    socket.on(SWITCH_PARTICIPANT_TYPE, async ({ key, userId, type }: { key: string; userId: string; type: ParticipantStatus }) => {
      if (key && userId && type) {
        const space = await switchType(key, userId, type);
        socket.emit(SWITCH_PARTICIPANT_TYPE, space);
      }
    });
  });
}

export { io };
