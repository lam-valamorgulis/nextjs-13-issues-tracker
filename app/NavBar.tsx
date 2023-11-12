// - Create NavBar componet outside of the folder : because next route could put the component same dir with page and layout will use

// ----------------------------------------
// The Link component allows you to navigate between pages without a full page refresh.
// Prefetching:
// Next.js automatically prefetches linked pages in the background, improving the user experience by reducing the delay when navigating to a new page.

// using usePathname access brower API convert to client component
//https://nextjs.org/docs/app/building-your-application/rendering/client-components

"use client";
import { Skeleton } from "@/app/ResuseableComponents";
import Link from "next/link";
// react-icon component will be a svg
//// npm i react-icons
import { AiFillBug } from "react-icons/ai";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { usePathname } from "next/navigation";
//  npm install classnames : this packate help to controll css appear
// npm i classnames
import classnames from "classnames";
import { useSession } from "next-auth/react";

const NavLink = () => {
  //usePathname is a Client Component hook that lets you read the current URL's pathname.
  // add 'use-client' for client component
  const pathname = usePathname();
  const LINKS = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues/list" },
  ];
  /*  highlight a link current active and change color when hover */
  return (
    <ul className="flex space-x-6">
      {LINKS.map((link) => (
        // this way can't control when more condition for css appear
        // <li
        //   key={link.lable}
        //   className={`${
        //     link.href == pathname ? 'text-zinc-900' : 'text-zinc-500'
        //   } hover:text-zinc-800 transition-colors`}
        // >
        <li
          key={link.href}
          className={classnames({
            // key: css name , value : boolean
            "text-zinc-900": link.href == pathname,
            "text-zinc-500": link.href != pathname,
            "hover:text-zinc-800 transition-colors": true,
          })}
        >
          <Link href={link.href}>{link.lable}</Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session!.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
