import config from 'config';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { joinSpace, setSpaceStatus, switchType } from '../services';
import { ParticipantStatus } from '../types';
import { ENTERED_SPACE, JOIN_SPACE, ME, START_SPACE, SWITCH_PARTICIPANT_TYPE } from './types';

const clientUrl = config.get<string>('clientUrl');

let io: null | SocketServer;

export function initSocketServer(server: Server) {
  io = new SocketServer(server, {
    cors: {
      origin: clientUrl,
      methods: ['GET', 'POST'],
    },
  });

  io?.on('connect', socket => {
    socket.emit(ME, socket.id);

    socket.on(ENTERED_SPACE, s => {
      // console.log({ s: s });
    });

    socket.on(START_SPACE, async ({ key, ownerId }: { key: string; ownerId: string }) => {
      if (key && ownerId) {
        const space = await setSpaceStatus(key, ownerId, 'STARTED');
        socket.emit(START_SPACE, space);
      }
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
