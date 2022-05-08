import { useCallback, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useTypedSelector } from '.';
import { JoinSpace, ParticipantStatus, SpaceItem } from '../@types';
import { useSnackbar } from 'notistack';

import { SocketContext } from '../spaces';
import { selectCurrentUser } from '../store/authSlice';
import { selectActiveSpace, setActiveSpace } from '../store/spaceSlice';

export default function useSocket() {
  const socket = useContext(SocketContext);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      socket?.removeAllListeners();
    };
  }, [activeSpace, socket, currentUser?.id]);

  const joinSpace = useCallback(
    (joinResult: JoinSpace) => {
      enqueueSnackbar(joinResult.message, { variant: 'success' });
      dispatch(setActiveSpace(joinResult.space));
    },
    [dispatch, enqueueSnackbar],
  );

  return { socket, joinSpace };
}
