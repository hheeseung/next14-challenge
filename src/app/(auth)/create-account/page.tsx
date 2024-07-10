import Signup from "@/components/Signup";

export function generateMetadata() {
  return {
    title: "회원가입",
    description: "Avocados에 회원가입 하기",
  };
}

export default function SignupPage() {
  return <Signup />;
}
