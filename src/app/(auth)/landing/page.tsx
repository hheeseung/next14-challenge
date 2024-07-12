import Link from "next/link";

export function generateMetadata() {
  return {
    title: "홈",
    description: "Avocados에 오신 것을 환영합니다!",
  };
}

export default function Home() {
  return (
    <section className="w-full h-screen flex flex-col justify-between items-center p-4 bg-lime-100">
      <div className="my-auto">
        <div className="text-9xl text-center">🥑</div>
        <h2 className="font-bold mt-10 text-2xl">SNS의 새로운 패러다임</h2>
      </div>
      <div className="flex flex-col justify-center items-center my-20 mx-10 w-full">
        <Link
          href="/log-in"
          className="bg-lime-600 w-full p-3 rounded-xl text-center text-white font-semibold hover:brightness-110 hover:transition-all"
        >
          로그인
        </Link>
        <div className="mt-5">
          <span>계정이 없다면</span>{" "}
          <Link
            href="/create-account"
            className="text-lime-600 hover:underline font-semibold"
          >
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
}
