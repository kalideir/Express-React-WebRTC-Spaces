import config from 'config';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { joinSpace } from '../services';
import { ParticipantStatus } from '../types';
import { getValue, setValue } from '../utils';
import {
  ALL_PARTICIPANTS,
  CLOSE,
  JOIN_SPACE,
  MUTE_REMOTE_MIC,
  RECEIVING_RETURNED_SIGNAL,
  RETURNING_SIGNAL,
  SENDING_SIGNAL,
  UNMUTE_REMOTE_MIC,
  UPDATED_SPACE,
  USER_DISCONNECTED,
  USER_JOINED,
} from './types';

const clientUrl = config.get<string>('clientUrl');

let io: null | SocketServer;

export function initSocketServer(server: Server) {
  io = new SocketServer(server, {
    cors: {
      origin: clientUrl,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    socket.on(JOIN_SPACE, async ({ spaceId, userId, type }: { spaceId: string; userId: string; type: ParticipantStatus }) => {
      if (!spaceId || !userId || !type) return;

      const prevUsers = ((await getValue(spaceId)) as { userId: string; socketId: string }[]) || [];

      const exists = !!prevUsers.find(user => user.userId === userId);

      const users = [...prevUsers];
      if (!exists) users.push({ socketId: socket.id, userId });

      await setValue(spaceId, users);

      await setValue(`get-space-${socket.id}`, spaceId);
      await setValue(`get-user-${socket.id}`, userId);

      const usersInThisRoom = users.filter(user => user.socketId !== socket.id);

      const spaceResponse = await joinSpace(spaceId, userId, type);

      socket.emit(ALL_PARTICIPANTS, usersInThisRoom);

      socket.emit(UPDATED_SPACE, spaceResponse);
    });

    socket.on(SENDING_SIGNAL, payload => {
      io.to(payload.userToSignal).emit(USER_JOINED, {
        signal: payload.signal,
        callerId: payload.callerId,
        userId: payload.userId,
        userToSignal: payload.userToSignal,
      });
    });

    socket.on(RETURNING_SIGNAL, payload => {
      io.to(payload.callerId).emit(RECEIVING_RETURNED_SIGNAL, { signal: payload.signal, id: socket.id });
    });

    socket.on(MUTE_REMOTE_MIC, targetId => {
      io.to(targetId).emit(MUTE_REMOTE_MIC, targetId);
    });

    socket.on(UNMUTE_REMOTE_MIC, targetId => {
      io.to(targetId).emit(UNMUTE_REMOTE_MIC, targetId);
    });

    socket.on('disconnect', async () => {
      const spaceId = (await getValue(`get-space-${socket.id}`)) || '';
      const userId = (await getValue(`get-user-${socket.id}`)) || '';

      let users = ((await getValue(spaceId)) as { userId: string; socketId: string }[]) || [];
      users = users.filter(user => user.socketId !== socket.id).filter(user => user.userId !== userId);

      await setValue(spaceId, users);
      await setValue(`get-space-${socket.id}`, null);

      socket.broadcast.emit(CLOSE, socket.id);
    });
  });

  //   socket.on(SWITCH_PARTICIPANT_TYPE, async ({ key, userId, type }: { key: string; userId: string; type: ParticipantStatus }) => {
  //     if (key && userId && type) {
  //       const space = await switchType(key, userId, type);
  //       socket.emit(SWITCH_PARTICIPANT_TYPE, space);
  //     }
  //   });
  // });
}

export { io };
