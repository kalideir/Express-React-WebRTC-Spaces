/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSnackbar } from 'notistack';
import Peer from 'simple-peer';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { JoinSpace } from '../@types';
import { selectCurrentUser } from '../store/authSlice';
import { getOnlineSpaces, selectActiveSpace, setActiveSpace, setOwnSocketId } from '../store/spaceSlice';
import { JOIN_SPACE, ME, USER_JOINED } from '../constants';
import { nanoid } from '@reduxjs/toolkit';

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
      peers: Peer.Instance[];
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

  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const socketRef = useRef<Socket | null>();
  const userVideo = useRef<any | null>({});
  const peersRef = useRef<{ peerID: string; peer: Peer.Instance }[]>([]);
  const roomID = activeSpace?.key;

  useEffect(() => {
    socketRef.current = io('http://localhost:8000');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;
      socketRef.current?.emit('join room', roomID);
      socketRef.current?.on('all users', users => {
        const peers: Peer.Instance[] = [];
        users.forEach((userID: string) => {
          const peer = createPeer(userID, socketRef.current?.id as string, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });

      socketRef.current?.on('user joined', payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        setPeers(users => [...users, peer]);
      });

      socketRef.current?.on('receiving returned signal', payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item?.peer.signal(payload.signal);
      });
    });
  }, [roomID]);

  function createPeer(userToSignal: string, callerID: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socketRef.current?.emit('sending signal', { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal: Peer.SignalData, callerID: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socketRef.current?.emit('returning signal', { signal, callerID });
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
    <SocketContext.Provider value={{ socket: socket.current, joinSpace, switchParticipantType, startSpace, userVideo, peers }}>
      {children}
    </SocketContext.Provider>
  );
}
