import { useCallback, useEffect, useState } from 'react';
import { SpaceItem } from '../@types';
import { SpaceCard, SpaceSkeleton } from '../components';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { Nav } from '../layout';
import { selectMySpaces } from '../store/spaceSlice';
import { getMySpaces } from '../store/spaceSlice';
import { range } from '../utils';

const Loading = () => {
  return (
    <>
      {range(12).map(index => (
        <SpaceSkeleton key={index} />
      ))}
    </>
  );
};

function Spaces() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const mySpaces = useTypedSelector(selectMySpaces);
  const getItems = useCallback(async () => {
    await dispatch(getMySpaces());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    getItems();
    setIsLoading(false);
  }, [dispatch, getItems]);

  return (
    <div className="min-h-full flex-col items-center justify-center mb-32 mx-auto max-w-5xl rounded pb-32">
      <div className="w-full">
        <Nav
          items={[
            { name: 'My Spaces', to: 'my-spaces' },
            { name: '', to: '' },
          ]}
        />
      </div>
      <div className="dark:bg-slate-800 bg-slate-100 rounded p-5 mt-3 grid grid-cols-3 gap-2">
        {isLoading ? <Loading /> : mySpaces?.map((item: SpaceItem) => <SpaceCard source="MY_SPACES" key={item.id} item={item} />)}
      </div>
    </div>
  );
}

export default Spaces;
