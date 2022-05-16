/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Requests, Streams } from '../components';
import { AddParticipant, Participants, SpaceActions, SpaceHeader } from '../components/Space';
import { SpaceStatus } from '../constants';
import { useTypedSelector } from '../hooks';
import { Divider, Nav } from '../layout';
import { selectCurrentUser } from '../store/authSlice';
import { getActiveSpace, selectActiveSpace } from '../store/spaceSlice';

function Space() {
  const dispatch = useDispatch();
  const { key, slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace);
  useLayoutEffect(() => {
    window.history.replaceState(null, '');
  }, []);

  const currentUser = useTypedSelector(selectCurrentUser);

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
        <h1 className="text-3xl text-slate-200">You are {currentUser?.username}</h1>
        {/* <SpaceHeader /> */}
        {!isLoading && activeSpace && activeSpace?.status !== SpaceStatus.CREATED && (
          <>
            {/* <Streams /> */}

            {/* <Divider /> */}
            {/* <SpaceActions /> */}
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
