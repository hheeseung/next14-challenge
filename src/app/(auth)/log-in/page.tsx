import Login from "@/components/Login";

export function generateMetadata() {
  return {
    title: "로그인",
    description: "Avocados에 로그인 하기",
  };
}

export default function LoginPage() {
  return <Login />;
}
