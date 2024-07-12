import Link from "next/link";

interface TweetsProps {
  id: number;
  tweet: string;
  user: {
    username: string;
  };
  created_at: Date;
  Like: any[];
}

export default function Tweet({
  id,
  tweet,
  user: { username },
  created_at,
}: TweetsProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <li className="mb-3 bg-white p-6 rounded-xl shadow-md bg-opacity-80 hover:bg-opacity-100 hover:scale-105 hover:transition-all">
        <p className="font-bold text-md">{username}</p>
        <p className="my-3 text-lg truncate">{tweet}</p>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xs">
            {created_at.toLocaleString()}
          </p>
        </div>
      </li>
    </Link>
  );
}
