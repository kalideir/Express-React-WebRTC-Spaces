/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSnackbar } from 'notistack';
import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { JoinSpace } from '../@types';
import { selectCurrentUser } from '../store/authSlice';
import { getOnlineSpaces, selectActiveSpace, setOwnSocketId } from '../store/spaceSlice';
import { ME } from '../constants';

export const SocketContext = createContext<{ socket: Socket | null; joinSpace: unknown; switchParticipantType: unknown } | any>({});

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSocket(io(`http://localhost:8000`, { forceNew: true }));
  }, []);

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
      if (!joinResult.space) {
        dispatch(getOnlineSpaces());
      }
      enqueueSnackbar(joinResult.message, { variant: joinResult.space ? 'success' : 'error' });
    },
    [enqueueSnackbar, dispatch],
  );

  return <SocketContext.Provider value={{ socket, joinSpace, switchParticipantType }}>{children}</SocketContext.Provider>;
}
