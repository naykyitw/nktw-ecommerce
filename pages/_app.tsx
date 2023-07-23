import Layout from "@/components/layout/index";
import { AppProps } from "next/app";
import "../style/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
