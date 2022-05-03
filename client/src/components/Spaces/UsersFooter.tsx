import { SpaceUser } from '../../@types';

interface IProps {
  users: SpaceUser[];
}

function UsersFooter(props: IProps) {
  const users = props.users;
  return (
    <div className="flex -space-x-2 flex-wrap">
      {users.slice(0, 12).map((user: SpaceUser) => (
        <img key={user.id} className="w-10 h-10 border-2 border-white rounded-full dark:border-slate-800" src={user.profilePicture.smallUrl} alt="" />
      ))}
      <a
        className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-indigo-700 border-2 border-white rounded-full hover:bg-indigo-600 dark:border-slate-800"
        href="#"
      >
        + {users.length || 12 - 12}
      </a>
    </div>
  );
}

export default UsersFooter;
