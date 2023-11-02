//  Nextjs 13 wrap your pages with a layout component, providing a consistent structure across those pages.
//Next.js uses a file-system based router where folders are used to define routes.
//The most common are pages to show UI unique to a route, and layouts to show UI that is shared across multiple routes.

//lamdang0306 - SumxYzOW0LfWLbaA
//mongodb+srv://lamdang0306:<password>@cluster0.abccnyu.mongodb.net/?retryWrites=true&w=majority

// import from radix library
import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// ThemePanel will create a panel for easy modify in radix ui
import { Theme, ThemePanel } from "@radix-ui/themes";
import "./theme-config.css";
import NavBar from "./NavBar";

// const inter = Inter({ subsets: ["latin"] });
//https://www.radix-ui.com/themes/docs/theme/typography#with-nextfont
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Learning Nextjs 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme appearance="light" accentColor="violet">
          {/* navbar on top */}
          <NavBar />
          {/* main part of the app */}
          <main className="p-5">{children}</main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
