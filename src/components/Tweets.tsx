"use client";
import { getMoreTweets } from "@/app/(tabs)/(home)/actions";
import { useState } from "react";
import Tweet from "./Tweet";
import { initialTweets } from "@/app/(tabs)/(home)/page";

interface TweetsProps {
  initialTweets: initialTweets;
}

export default function Tweets({ initialTweets }: TweetsProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const loadTweets = async (nowPage: number) => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(nowPage);

    if (newTweets.length !== 0) {
      setPage(nowPage);
      setTweets(newTweets);
      setIsLast(false);
    } else {
      setIsLast(true);
    }
    setIsLoading(false);
  };

  const handleLoadNext = async () => {
    loadTweets(page + 1);
  };

  const handleLoadPrev = async () => {
    loadTweets(page - 1);
  };

  return (
    <ul className="max-h-screen px-5 overflow-scroll pb-16">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
      <div
        className={`"w-full flex items-center ${
          page === 0 ? "justify-end" : "justify-between"
        }`}
      >
        {page > 0 && (
          <button onClick={handleLoadPrev}>
            {isLoading ? "로딩 중..." : "＜ Prev"}
          </button>
        )}
        {!isLast && (
          <button onClick={handleLoadNext}>
            {isLoading ? "로딩 중..." : "Next ＞"}
          </button>
        )}
      </div>
    </ul>
  );
}
