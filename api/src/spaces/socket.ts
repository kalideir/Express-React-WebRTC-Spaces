import config from 'config';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { findParticipant, joinSpace, setSpaceStatus, switchType } from '../services';
import { ParticipantStatus } from '../types';
import { getValue, setValue } from '../utils';

import { ALL_PARTICIPANTS, JOIN_SPACE, RECEIVING_RETURNED_SIGNAL, RETURNING_SIGNAL, SENDING_SIGNAL, UPDATED_SPACE, USER_JOINED } from './types';

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

      let users = prevUsers.length ? [...prevUsers, { socketId: socket.id, userId }] : [{ socketId: socket.id, userId }];

      if (users.length > 2) {
        users = users.reduce((acc, curr) => {
          const exists = !!acc.find(user => user.userId === userId);

          if (!exists) {
            acc.push(curr);
            return acc;
          }
          return acc;
        }, []);
      }

      await setValue(spaceId, users);

      await setValue(socket.id, spaceId);

      const usersInThisRoom = users.filter(user => user.socketId !== socket.id);

      const space = await joinSpace(spaceId, userId, type);

      socket.emit(ALL_PARTICIPANTS, usersInThisRoom);

      socket.emit(UPDATED_SPACE, space);
    });

    socket.on(SENDING_SIGNAL, payload => {
      io.to(payload.userToSignal).emit(USER_JOINED, { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on(RETURNING_SIGNAL, payload => {
      io.to(payload.callerID).emit(RECEIVING_RETURNED_SIGNAL, { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', async () => {
      const spaceId = (await getValue(socket.id)) as string;
      const users = ((await getValue(spaceId)) as { userId: string; socketId: string }[]) || [];

      let room = users[spaceId];
      if (room) {
        room = room.filter(user => user.socketId !== socket.id);
        users[spaceId] = room;

        setValue(spaceId, []); // users
        setValue(socket.id, null);
      }
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
