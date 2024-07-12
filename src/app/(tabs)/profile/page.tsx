import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { CiAvocado } from "react-icons/ci";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        username: true,
        email: true,
        bio: true,
      },
    });
    if (user) {
      return user;
    } else {
      notFound();
    }
  }
}

export async function generateMetadata() {
  const user = await getUser();
  return {
    title: `${user?.username}의 프로필`,
    description: "Avocado의 프로필 확인하기",
  };
}

export default async function Profile() {
  const userInfo = await getUser();

  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/landing");
  };

  return (
    <section className="text-center">
      <div className="flex items-center justify-between p-6">
        <h1 className="font-bold text-2xl">🐸 Profile</h1>
        <form action={logout}>
          <button className="text-sm text-lime-600 font-medium">
            로그아웃
          </button>
        </form>
      </div>
      <div className="mx-auto size-24 bg-white text-lime-600 shadow-md flex justify-center items-center rounded-full">
        <CiAvocado className="size-16" />
      </div>
      <div className="p-4">
        <p className="font-semibold">@{userInfo?.username}</p>
        <p className="font-medium text-sm text-neutral-500">
          {userInfo?.email}
        </p>
        <p className="bg-lime-700 p-3 rounded-xl mt-5 text-white opacity-90">
          {userInfo && userInfo.bio
            ? userInfo.bio
            : "아직 작성된 자기소개가 없습니다."}
        </p>
      </div>
    </section>
  );
}
