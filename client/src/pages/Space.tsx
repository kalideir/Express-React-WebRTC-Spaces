import { Participants, Permission, SpaceHeader, SpeakerView } from '../components/Space';
import { useDispatch } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getActiveSpace, togglePermissionModal } from '../store/spaceSlice';
import { MIC_ACCESS_GRANTED } from '../constants';
import { useParams } from 'react-router-dom';
import { Nav } from '../layout';
function Space() {
  const dispatch = useDispatch();
  const { key, slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="max-w-5xl mx-auto mb-10">
      <div className="w-full">
        <Nav
          items={[
            { name: slug || '', to: `/${key}/${slug}` },
            { name: '', to: '' },
          ]}
        />
      </div>
      <div className="mx-auto rounded-xl bg-slate-100  dark:bg-slate-800 pb-10 w-full mt-3 pt-2">
        <SpeakerView />
        <SpaceHeader />
        <Participants />
        <Permission />
      </div>
    </div>
  );
}

export default Space;
