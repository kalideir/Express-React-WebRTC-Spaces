import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SpaceCard } from '../components';
import { useAppDispatch } from '../hooks';
import { Nav } from '../layout';
import { selectMySpaces } from '../store/profileSlice';
import { getMySpaces } from '../store/spaceSlice';

function Spaces() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const mySpaces = useSelector(selectMySpaces);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getMySpaces());
    setIsLoading(false);
  }, [dispatch]);
  return (
    <div>
      <div className="min-h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8  mb-32 mx-auto max-w-5xl rounded pb-32 ">
        <div className="w-full">
          <Nav
            items={[
              { name: 'My Spaces', to: 'my-spaces' },
              { name: '', to: '' },
            ]}
          />
        </div>
        <div className="dark:bg-slate-800 bg-slate-100 rounded p-5 mt-10 grid grid-cols-3 gap-2">
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
        </div>
      </div>
    </div>
  );
}

export default Spaces;
