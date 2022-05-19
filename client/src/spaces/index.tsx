/* eslint-disable prefer-rest-params */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSnackbar } from 'notistack';
import { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Peer from 'simple-peer';
import io, { Socket } from 'socket.io-client';
import { JoinSpace, PeerUser, SocketUser, SpaceContext } from '../@types';
import {
  ALL_PARTICIPANTS,
  CLOSE,
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

export const SocketContext = createContext<any | SpaceContext>({});

export default function SocketProvider({ children }: { children: ReactNode }) {
  const activeSpace = useTypedSelector(selectActiveSpace);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [peers, setPeers] = useState<PeerUser[]>([]);
  const socketRef = useRef<Socket | null>();
  const userStream = useRef<any | null>({});
  const peersRef = useRef<{ peerId: string; peer: Peer.Instance }[]>([]);
  const spaceId = activeSpace?.key;

  useEffect(() => {
    if (!currentUser?.id) return;
    socketRef.current = io('http://localhost:8000');

    navigator.mediaDevices.getUserMedia({ video: !false, audio: true }).then(stream => {
      userStream.current.srcObject = stream;
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

      socketRef.current?.on(ALL_PARTICIPANTS, (_users: SocketUser[]) => {
        console.log('users: ', _users);

        const peers: PeerUser[] = [];
        _users
          // .filter(user => user.userId !== currentUser?.id)
          .forEach(socketUser => {
            const peer = createPeer(socketUser.socketId, socketRef.current?.id as string, stream);
            peersRef.current.push({
              peerId: socketUser.socketId,
              peer,
            });
            peers.push({ peer, socketId: socketUser.socketId, userId: socketUser.userId });
          });

        setPeers(peers);
      });

      socketRef.current?.on(USER_JOINED, payload => {
        const item = peersRef.current.find(p => p.peerId === payload.callerId);
        if (!item) {
          const peer = addPeer(payload.signal, payload.callerId, stream);

          peersRef.current.push({
            peerId: payload.callerId,
            peer,
          });

          setPeers(ps => [...ps, { peer, userId: payload.userId, socketId: payload.callerId }]);
        }
      });

      socketRef.current?.on(RECEIVING_RETURNED_SIGNAL, payload => {
        const item = peersRef.current.find(p => p.peerId === payload.id);
        item?.peer.signal(payload.signal);
      });

      socketRef.current?.on(CLOSE, (peerId: string) => {
        const _peers = [...peers];
        _peers.forEach((peer, index) => {
          if (peer.socketId === peerId) {
            peer.peer.destroy();
            _peers.splice(index, 1);
          }
        });
        setPeers(_peers); // we used socketId as a peerId above
        peersRef.current = peersRef.current.filter(peer => peer.peerId !== peerId);
      });
    });
  }, [spaceId, currentUser?.id]);

  function createPeer(userToSignal: string /* socket id*/, callerId: string /* socket id */, stream: MediaStream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }, { urls: ['stun:stun1.l.google.com:19302'] }] },
    });

    peer.on('signal', signal => {
      socketRef.current?.emit(SENDING_SIGNAL, { userToSignal, callerId, signal, userId: currentUser?.id });
    });

    return peer;
  }

  function addPeer(incomingSignal: Peer.SignalData, callerId: string /* socket id*/, stream: MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }, { urls: ['stun:stun1.l.google.com:19302'] }] },
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
    <SocketContext.Provider value={{ socketRef, joinSpace, switchParticipantType, startSpace, userStream, peers }}>{children}</SocketContext.Provider>
  );
}
