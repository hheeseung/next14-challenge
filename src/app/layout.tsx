import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Avocados",
    template: "Avocados | %s",
  },
  description: "아보카도와 함께 친구를 만들고 마음껏 이야기하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <main className="w-full max-w-screen-sm h-screen mx-auto bg-lime-100">
          {children}
        </main>
      </body>
    </html>
  );
}
