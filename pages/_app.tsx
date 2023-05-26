// _app.tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "../app/globals.css";
import Container from "../components/container";
import Intro from "../components/intro";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import Head from "next/head";
import { AlertContext } from "@/contexts/AlertContext";

function MyApp({ Component, pageProps }: AppProps) {
  // Alert
  const [alertMessage, setAlertMessage] = useState("");

  // Initialize showGetOnListLink as true in a state variable, then after the component has mounted, update showGetOnListLink based on router.query
  const router = useRouter();
  const [showGetOnListLink, setshowGetOnListLink] = useState(false);
  useEffect(() => {
    setshowGetOnListLink(router.query.showGetOnListLink === "true");
  }, [router.query]);

  return (
    <AlertContext.Provider value={{ alertMessage, setAlertMessage }}>
      <Layout>
        <Container>
          <Head>
            <title>Hal's List</title>
          </Head>
          <Intro showGetOnListLink={showGetOnListLink} />
          <Component {...pageProps} />
        </Container>
      </Layout>
    </AlertContext.Provider>
  );
}
export default MyApp;
