// _app.tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "../app/globals.css";
import Container from "../components/container";
import Intro from "../components/intro";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize showGetOnListLink as true in a state variable, then after the component has mounted, update showGetOnListLink based on router.query
  const router = useRouter();
  const [showGetOnListLink, setshowGetOnListLink] = useState(false);
  useEffect(() => {
    setshowGetOnListLink(router.query.showGetOnListLink === "true");
  }, [router.query]);

  return (
    <Container>
      <Intro showGetOnListLink={showGetOnListLink} />
      <Component {...pageProps} />
    </Container>
  );
}
export default MyApp;
