import Tweets from "@/components/Tweets";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { FaPen } from "react-icons/fa";
import Link from "next/link";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      user: {
        select: { username: true },
      },
      created_at: true,
      Like: true,
    },
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type initialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <section className="max-h-screen">
      <div className="flex items-center justify-between p-6">
        <h1 className="font-bold text-2xl">🥑 Tweets</h1>
        <Link href="/tweets/add">
          <FaPen className="hover:brightness-125 hover:scale-105 transition-all bg-lime-700 text-white size-9 p-2 rounded-xl shadow-md" />
        </Link>
      </div>
      <Tweets initialTweets={initialTweets} />
    </section>
  );
}
