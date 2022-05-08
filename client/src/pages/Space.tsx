import { AddParticipant, Participants, SpaceActions, SpaceHeader } from '../components/Space';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getActiveSpace, selectActiveSpace } from '../store/spaceSlice';
import { JOIN_SPACE, ME, ParticipantTypes, SpaceStatus } from '../constants';
import { useParams } from 'react-router-dom';
import { Divider, Nav } from '../layout';
import { useSocket, useTypedSelector } from '../hooks';
import { Requests } from '../components';
import { selectCurrentUser } from '../store/authSlice';

function Space() {
  const dispatch = useDispatch();
  const { key, slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const [me, setMe] = useState('');
  const currentUser = useTypedSelector(selectCurrentUser);
  const { socket, joinSpace } = useSocket();

  useEffect(() => {
    if (activeSpace && socket && currentUser) {
      socket?.emit(ME);
      socket?.on(ME, (id: string) => setMe(id));
    }
  }, [socket, activeSpace, currentUser, joinSpace]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getActiveSpace(key || ''));
    setIsLoading(false);
  }, [dispatch, key]);

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
        {!isLoading && activeSpace && activeSpace?.status !== SpaceStatus.CREATED && (
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
