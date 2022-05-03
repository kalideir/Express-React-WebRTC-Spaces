import { AddParticipant, Participants, Permission, SpaceActions, SpaceHeader } from '../components/Space';
import { useDispatch } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getActiveSpace, selectActiveSpace, togglePermissionModal } from '../store/spaceSlice';
import { MIC_ACCESS_GRANTED, SpaceStatus } from '../constants';
import { useParams } from 'react-router-dom';
import { Nav } from '../layout';
import { useTypedSelector } from '../hooks';

function Space() {
  const dispatch = useDispatch();
  const { key, slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getActiveSpace(key || ''));
    setIsLoading(false);
  }, [dispatch, key]);

  useLayoutEffect(() => {
    const access = Boolean(localStorage.getItem(MIC_ACCESS_GRANTED));
    if (!access) dispatch(togglePermissionModal());
  }, [dispatch]);

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
            <SpaceActions />
            <Participants />
          </>
        )}

        <Permission />
        <AddParticipant />
      </div>
    </div>
  );
}

export default Space;
