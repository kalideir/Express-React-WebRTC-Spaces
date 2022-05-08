/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useTypedSelector } from '.';
import { JoinSpace, ParticipantStatus, SpaceItem } from '../@types';
import { useSnackbar } from 'notistack';

import { SocketContext } from '../spaces';
import { selectCurrentUser } from '../store/authSlice';
import { getOnlineSpaces, selectActiveSpace, setActiveSpace } from '../store/spaceSlice';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils';

export default function useSocket() {
  const socket = useContext(SocketContext);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      socket?.removeAllListeners();
    };
  }, [activeSpace, socket, currentUser?.id]);

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

  return { socket, joinSpace, switchParticipantType };
}
