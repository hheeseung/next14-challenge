"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiHome4Line, RiHome4Fill } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegUser, FaUser } from "react-icons/fa";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 grid grid-cols-3 max-w-screen-sm w-full place-items-center text-2xl py-4 border-t border-lime-200 text-lime-800">
      <Link href="/">
        {pathname === "/" ? <RiHome4Fill /> : <RiHome4Line />}
      </Link>
      <Link href="/likes">
        {pathname === "/likes" ? <FaHeart /> : <FaRegHeart />}
      </Link>
      <Link href="/profile">
        {pathname === "/profile" ? <FaUser /> : <FaRegUser />}
      </Link>
    </nav>
  );
}
