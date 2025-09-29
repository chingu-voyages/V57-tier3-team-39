"use client";
import Link from "next/link";
// import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  return (
    <header
      className="flex justify-between text-center max-w-[1280] mx-auto text-white p-4"
      style={{ backgroundColor: "#805AD5" }}
    >
      <Link href="/">Home</Link>
      <Link href="/open-prs">Open PRs</Link>
      <Link href="/closed-prs">Closed PRs</Link>
    </header>
  );
};

export default Header;
