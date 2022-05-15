/* eslint-disable react-hooks/exhaustive-deps */
import { useSnackbar } from 'notistack';
import { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Peer from 'simple-peer';
import io, { Socket } from 'socket.io-client';
import type { JoinSpace, PeerUser, SocketUser } from '../@types';
import {
  ALL_PARTICIPANTS,
  JOIN_SPACE,
  ParticipantTypes,
  RECEIVING_RETURNED_SIGNAL,
  RETURNING_SIGNAL,
  SENDING_SIGNAL,
  USER_JOINED,
} from '../constants';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { selectCurrentUser } from '../store/authSlice';
import { getOnlineSpaces, selectActiveSpace, setActiveSpace } from '../store/spaceSlice';

export const SocketContext = createContext<
  | {
      socket: Socket | null;
      joinSpace: unknown;
      switchParticipantType: unknown;
      startSpace: unknown;
      stream: MediaStream | null;
      me: Peer.Instance;
      streams: { [key: string]: MediaStream };

      userVideo: MediaStream | null;
      peers: PeerUser[];
      users: SocketUser[];
    }
  | any
>({});

export default function SocketProvider({ children }: { children: ReactNode }) {
  const socket = useRef<Socket | null>(null);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [peers, setPeers] = useState<PeerUser[]>([]);
  const socketRef = useRef<Socket | null>();
  const userVideo = useRef<any | null>({});
  const peersRef = useRef<{ peerId: string; peer: Peer.Instance }[]>([]);
  const spaceId = activeSpace?.key;
  const [users, setUsers] = useState<SocketUser[]>([]);

  const isAMember = users.find(user => user.userId === currentUser?.id);

  console.log({ peers, users });

  useEffect(() => {
    if (!currentUser?.id) return;
    socketRef.current = io('http://localhost:8000');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;
      socketRef.current?.emit(JOIN_SPACE, {
        spaceId,
        userId: currentUser?.id,
        type:
          activeSpace?.ownerId === currentUser?.id
            ? ParticipantTypes.HOST
            : activeSpace?.isPublic
            ? ParticipantTypes.GUEST
            : ParticipantTypes.PENDING,
      });

      // socketRef.current?.on(UPDATED_SPACE, (spaceResponse: { space: SpaceItem; [key: string]: any } | null) => {
      //   spaceResponse?.space && dispatch(setActiveSpace(spaceResponse.space));
      // });

      socketRef.current?.on(ALL_PARTICIPANTS, (users: SocketUser[]) => {
        users = users.reduce((acc, curr) => {
          const exists = !!acc.find(user => user.userId === curr.userId);
          if (exists) return acc;
          acc.push(curr);
          return acc;
        }, [] as SocketUser[]);
        setUsers(users);
        const peers: PeerUser[] = [];

        users.forEach(({ userId, socketId }: SocketUser) => {
          const peer = createPeer(socketId, socketRef.current?.id as string, stream, userId);
          peersRef.current.push({
            peerId: socketId,
            peer,
          });
          peers.push({ userId, peer });
        });
        setPeers(peers);
      });

      socketRef.current?.on(USER_JOINED, payload => {
        const peer = addPeer(payload.signal, payload.callerId, stream);
        peersRef.current.push({
          peerId: payload.callerId,
          peer,
        });

        setPeers(ps => [...ps, { userId: payload.userId, peer }]);
      });

      socketRef.current?.on(RECEIVING_RETURNED_SIGNAL, payload => {
        const item = peersRef.current.find(p => p.peerId === payload.id);
        item?.peer.signal(payload.signal);
      });
    });
  }, [spaceId, currentUser?.id]);

  function createPeer(userToSignal: string, callerId: string, stream: MediaStream, userId: string) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socketRef.current?.emit(SENDING_SIGNAL, { userToSignal, callerId, signal, userId });
    });

    return peer;
  }

  function addPeer(incomingSignal: Peer.SignalData, callerId: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socketRef.current?.emit(RETURNING_SIGNAL, { signal, callerId });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const startSpace = useCallback(
    (startResult: JoinSpace, url: string) => {
      enqueueSnackbar(startResult.message, { variant: startResult.space ? 'success' : 'warning' });
      if (startResult.space.status !== 'STARTED') {
        enqueueSnackbar('Errors starting this space', { variant: 'error' });
        return;
      }
      navigate(url);
    },
    [dispatch, enqueueSnackbar],
  );

  const joinSpace = useCallback(
    (joinResult: JoinSpace, url: string) => {
      if (!joinResult.space) {
        dispatch(getOnlineSpaces());
      }

      enqueueSnackbar(joinResult.message, { variant: joinResult.space ? 'success' : 'warning' });
      navigate(url);
    },
    [dispatch, enqueueSnackbar],
  );

  const switchParticipantType = useCallback(
    (joinResult: JoinSpace) => {
      if (joinResult.space) {
        dispatch(setActiveSpace(joinResult.space));
      }
      enqueueSnackbar(joinResult.message, { variant: joinResult.space ? 'success' : 'error' });
    },
    [enqueueSnackbar, dispatch],
  );

  return (
    <SocketContext.Provider value={{ socket: socket.current, joinSpace, switchParticipantType, startSpace, userVideo, peers, users }}>
      {children}
    </SocketContext.Provider>
  );
}
