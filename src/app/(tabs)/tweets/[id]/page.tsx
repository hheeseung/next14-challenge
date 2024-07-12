import db from "@/lib/db";
import { notFound } from "next/navigation";
import { BsHandThumbsUp } from "react-icons/bs";

interface TweetDetailProps {
  params: {
    id: number;
  };
}

async function getTweetDetail(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      created_at: true,
      tweet: true,
      Like: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({ params }: TweetDetailProps) {
  const id = Number(params.id);
  const tweet = await getTweetDetail(id);

  if (!tweet || isNaN(id)) {
    return notFound();
  }

  return (
    <section className="p-8">
      <article className="w-full bg-white bg-opacity-90 p-6 rounded-xl shadow-md">
        <p className="font-bold">{tweet.user.username}</p>
        <p className="text-xl my-5 leading-relaxed">{tweet.tweet}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-500">
            {tweet.created_at.toLocaleString()}
          </p>
          <div className="text-sm flex items-center gap-1">
            <span>{tweet.Like.length}</span>
            <BsHandThumbsUp className="text-lg" />
          </div>
        </div>
      </article>
    </section>
  );
}
