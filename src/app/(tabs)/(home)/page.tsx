import Tweets from "@/components/Tweets";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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
      <h1 className="font-bold text-2xl p-6">🥑 Tweets</h1>
      <Tweets initialTweets={initialTweets} />
    </section>
  );
}
