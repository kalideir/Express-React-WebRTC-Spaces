/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Requests } from '../components';
import { AddParticipant, ConfirmEndSpace, Participants, SpaceActions, SpaceHeader } from '../components/Space';
import { SpaceStatus } from '../constants';
import { useTypedSelector } from '../hooks';
import { Divider, Nav } from '../layout';
import { SocketContext } from '../spaces';
import { selectCurrentUser } from '../store/authSlice';
import { getActiveSpace, selectActiveSpace } from '../store/spaceSlice';

function Space() {
  const dispatch = useDispatch();
  const { key, slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace);
  const currentUser = useTypedSelector(selectCurrentUser);

  const isSpaceHost = activeSpace?.ownerId === currentUser?.id;

  useLayoutEffect(() => {
    window.history.replaceState(null, '');
  }, []);

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
            <Divider />
            {isSpaceHost && (
              <div className="my-20 flex items-center justify-center">
                <div className="flex justify-end px-5 pt-5 relative">
                  <button
                    onClick={() => setVisible(true)}
                    type="button"
                    className="text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    End Space
                  </button>
                  <ConfirmEndSpace visible={visible} setVisible={setVisible} spaceId={activeSpace?.id as string} />
                </div>
              </div>
            )}
          </>
        )}

        <AddParticipant />
        <Requests />
      </div>
    </div>
  );
}

export default Space;
