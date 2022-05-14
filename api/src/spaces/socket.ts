import config from 'config';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { joinSpace, setSpaceStatus, switchType } from '../services';
import { ParticipantStatus } from '../types';
import { ENTERED_SPACE, JOIN_SPACE, ME, START_SPACE, SWITCH_PARTICIPANT_TYPE, USER_JOINED } from './types';

const clientUrl = config.get<string>('clientUrl');

let io: null | SocketServer;

const users = {};

const socketToRoom = {};

export function initSocketServer(server: Server) {
  io = new SocketServer(server, {
    cors: {
      origin: clientUrl,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    socket.on('join room', roomID => {
      console.log({ roomID });

      if (users[roomID]) {
        const length = users[roomID].length;
        if (length === 4) {
          socket.emit('room full');
          return;
        }
        users[roomID].push(socket.id);
      } else {
        users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

      socket.emit('all users', usersInThisRoom);
    });

    socket.on('sending signal', payload => {
      io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on('returning signal', payload => {
      io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
      const roomID = socketToRoom[socket.id];
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
