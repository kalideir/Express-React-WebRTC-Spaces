import { AddParticipant, Participants, SpaceActions, SpaceHeader } from '../components/Space';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { getActiveSpace, selectActiveSpace, togglePermissionModal } from '../store/spaceSlice';
import { ENTERED_SPACE, ME, MIC_ACCESS_GRANTED, SpaceStatus } from '../constants';
import { useParams } from 'react-router-dom';
import { Divider, Nav } from '../layout';
import { useTypedSelector } from '../hooks';
import { Requests } from '../components';
import { SocketContext } from '../spaces';
import { selectCurrentUser } from '../store/authSlice';

function Space() {
  const dispatch = useDispatch();
  const { key, slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const socket = useContext(SocketContext);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getActiveSpace(key || ''));
    setIsLoading(false);
  }, [dispatch, key]);

  useEffect(() => {
    socket?.emit(ENTERED_SPACE, { id: activeSpace?.id, userId: currentUser?.id });
    socket?.on(ME, (e: any) => {
      console.log({ e });
    });
  }, [activeSpace, socket, currentUser?.id]);

  return (
    <div className="max-w-5xl mx-auto mb-10" id="space">
      <div className="w-full">
        <Nav
          items={[
            { name: 'My Spaces', to: '/my-spaces' },
            { name: slug || '', to: `/${key}/${slug}` },
            { name: '', to: '' },
          ]}
        />
      </div>
      <div className="mx-auto rounded-xl pb-10 w-full mt-3 pt-2">
        <SpaceHeader />
        {activeSpace && activeSpace?.status !== SpaceStatus.CREATED && (
          <>
            <Divider />
            <SpaceActions />
            <Divider />
            <Participants />
          </>
        )}

        <AddParticipant />
        <Requests />
      </div>
    </div>
  );
}

export default Space;
