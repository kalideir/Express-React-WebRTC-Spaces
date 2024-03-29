import clsx from 'clsx';

function Dot({ color, size }: { color: string; size: number }) {
  return <div className={clsx(['mr-2 rounded-full', `h-${size} w-${size} ${color}`])} style={{ width: 10, height: 10 }} />;
}

export default Dot;
