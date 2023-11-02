"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];

  const pathname = usePathname();
  return (
    <nav className="flex border-b items-center space-x-6 h-14 px-5 mb-5">
      <Link className="text-red-400 text-2xl" href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-zinc-900": link.href === pathname,
              "text-zinc-500": link.href !== pathname,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
