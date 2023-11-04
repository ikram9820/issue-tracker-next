"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Text,
  Flex,
} from "@radix-ui/themes";
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
    <nav className="border-b py-3 px-5 mb-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout"> Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin"> Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
