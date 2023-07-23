import Head from "next/head";
import Header from "./header/Header";
import { ReactNode } from "react";
import { useRouter } from "next/router";

import styles from "./Header.module.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pagesWithoutHeader = ["/"];
  const hideHeader = pagesWithoutHeader.includes(router.pathname);

  return (
    <>
      <Head>
        <title>NKTW Ecommerce | NKTW</title>
        <meta name="description" content="NKTW Ecommerce | NKTW" key="desc" />
      </Head>
      {!hideHeader && <Header />}
      <div
        style={{ maxWidth: !hideHeader ? "1024px" : "100%", margin: "auto" }}
      >
        {children}
      </div>
    </>
  );
}