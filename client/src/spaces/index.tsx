/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSnackbar } from 'notistack';
import Peer from 'peerjs';
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
      me: Peer;
      streams: { [key: string]: MediaStream };
    }
  | any
>({});

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [streams, setStreams] = useState<{ [key: string]: MediaStream }>({});
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    setSocket(io(`http://localhost:8000`, { forceNew: true }));
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
    });
  }, []);

  useEffect(() => {
    socket?.on(ME, sockId => {
      dispatch(setOwnSocketId(sockId));
    });
  }, [socket]);

  useEffect(() => {
    const savedId = localStorage.getItem('userId');
    const meId = savedId || nanoid(20);

    localStorage.setItem('userId', meId);

    const peer = new Peer(meId);
    setMe(peer);
    console.log({ me, peer });
  }, []);

  console.log({ streams });

  useEffect(() => {
    // if (!me) return;
    if (!stream) return;
    socket?.on(USER_JOINED, ({ peerId }: { peerId: string }) => {
      console.log({ peerId, myid: me?.id, x: 1 });

      enqueueSnackbar('User joined ' + peerId, { variant: 'info' });
      const call = me?.call(peerId, stream, {});
      call?.on('stream', (peerStream: any) => {
        console.log({ peerStream });

        setStreams({ ...streams, [peerId]: peerStream });
        // dispatch(setStreams({ key: peerId, stream: peerStream }));
      });
    });
    me?.on('call', (call: any) => {
      call.answer(stream);
      call.on('stream', (peerStream: any) => {
        console.log({ peerStream }, 'x');

        setStreams({ ...streams, [call.peer]: peerStream });
      });
    });
  }, [me, stream]);

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
    <SocketContext.Provider value={{ socket, joinSpace, switchParticipantType, startSpace, stream, me, streams }}>{children}</SocketContext.Provider>
  );
}
