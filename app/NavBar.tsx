"use client";
import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues/list", label: "Issues" },
];
const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav className="flex border-b items-center space-x-6 h-14 px-5 mb-5">
      <Link className="text-red-400 text-2xl" href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                "text-zinc-900": link.href === pathname,
                "text-zinc-500": link.href !== pathname,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout"> Logout</Link>
          )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin"> Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
