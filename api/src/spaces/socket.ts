import config from 'config';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { joinSpace, setSpaceStatus, switchType } from '../services';
import { ParticipantStatus } from '../types';
import { getValue, setValue } from '../utils';

import { ALL_PARTICIPANTS, JOIN_SPACE, RECEIVING_RETURNED_SIGNAL, RETURNING_SIGNAL, SENDING_SIGNAL, USER_JOINED } from './types';

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
    socket.on(JOIN_SPACE, async roomID => {
      if (!roomID) return;
      const prevUsers = ((await getValue(roomID)) as string[]) || [];

      const users = prevUsers.length ? [...prevUsers, socket.id] : [socket.id];

      await setValue(roomID, users);

      await setValue(socket.id, roomID);

      const usersInThisRoom = users.filter(id => id !== socket.id);

      socket.emit(ALL_PARTICIPANTS, usersInThisRoom);
    });

    socket.on(SENDING_SIGNAL, payload => {
      io.to(payload.userToSignal).emit(USER_JOINED, { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on(RETURNING_SIGNAL, payload => {
      io.to(payload.callerID).emit(RECEIVING_RETURNED_SIGNAL, { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', async () => {
      const roomID = (await getValue(socket.id)) as string;
      const users = ((await getValue(roomID)) as string[]) || [];

      let room = users[roomID];
      if (room) {
        room = room.filter(id => id !== socket.id);
        users[roomID] = room;
      }
    });
  });

  // io?.on('connection', socket => {
  //   socket.emit(ME, socket.id);

  //   socket.on(ENTERED_SPACE, s => {
  //     // // console.log({ s: s });
  //   });

  //   socket.on('callUser', data => {
  //     // console.log({ data }, 'xx');
  //     io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name });
  //   });

  //   socket.on('answerCall', data => {
  //     io.to(data.to).emit('callAccepted', data.signal);
  //   });

  //   socket.on(START_SPACE, async ({ key, ownerId }: { key: string; ownerId: string }) => {
  //     if (key && ownerId) {
  //       const space = await setSpaceStatus(key, ownerId, 'STARTED');
  //       socket.emit(START_SPACE, space);
  //     }
  //   });

  //   socket.on(JOIN_SPACE, async ({ roomId, key, userId, peerId }: { roomId: string; key: string; userId: string; peerId: string }) => {
  //     // console.log('JOIN_SPACE', { roomId, peerId });
  //     socket.join(roomId);
  //     // if (key && userId && type) {
  //     // const space = await joinSpace(key, userId, type);
  //     socket.emit(USER_JOINED, { peerId });
  //     // }
  //   });

  //   socket.on(SWITCH_PARTICIPANT_TYPE, async ({ key, userId, type }: { key: string; userId: string; type: ParticipantStatus }) => {
  //     if (key && userId && type) {
  //       const space = await switchType(key, userId, type);
  //       socket.emit(SWITCH_PARTICIPANT_TYPE, space);
  //     }
  //   });
  // });
}

export { io };
