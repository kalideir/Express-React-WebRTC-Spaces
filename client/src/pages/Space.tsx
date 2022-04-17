import { Participants, Permission, SpaceHeader, SpeakerView } from '../components/Space';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { togglePermissionModal } from '../store/spaceSlice';
import { MIC_ACCESS_GRANTED } from '../constants';
function Space() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const access = Boolean(localStorage.getItem(MIC_ACCESS_GRANTED));
    if (!access) dispatch(togglePermissionModal());
  }, [dispatch]);

  return (
    <div className="container mx-auto mb-10">
      <div className="w-10/12 mx-auto rounded-xl bg-slate-100  dark:bg-slate-800 pb-10">
        <SpaceHeader />
        <SpeakerView />
        <Participants />
        <Permission />
      </div>
    </div>
  );
}

export default Space;
