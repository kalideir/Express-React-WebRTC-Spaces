/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Requests, Streams } from '../components';
import { AddParticipant, Participants, SpaceActions, SpaceHeader } from '../components/Space';
import { JOIN_SPACE, SpaceStatus } from '../constants';
import { useTypedSelector } from '../hooks';
import { Divider, Nav } from '../layout';
import { SocketContext } from '../spaces';
import { selectCurrentUser } from '../store/authSlice';
import { getActiveSpace, selectActiveSocket, selectActiveSpace } from '../store/spaceSlice';

function Space() {
  const dispatch = useDispatch();
  const { key, slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const spaceSocketId = useTypedSelector(selectActiveSocket);
  useLayoutEffect(() => {
    window.history.replaceState(null, '');
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getActiveSpace(key || ''));
    setIsLoading(false);
  }, [dispatch, key]);

  // const { me, stream, socket } = useContext(SocketContext);
  // const currentUser = useTypedSelector(selectCurrentUser);
  // useEffect(() => {
  //   // console.log({ spaceSocketId });

  //   if (me && stream && activeSpace?.key && spaceSocketId)
  //     socket.emit(JOIN_SPACE, { roomId: spaceSocketId, key: activeSpace?.key, peerId: me._id, userId: currentUser?.id });
  // }, [activeSpace?.key, me, socket, stream, currentUser?.id, spaceSocketId]);

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
            <Streams />
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
