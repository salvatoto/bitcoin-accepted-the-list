import { useRouter } from "next/router";
import Layout from "../components/layout";
import Head from "next/head";
import ProvidersGrid from "@/components/providers-grid";

export default function Index({}) {
  const router = useRouter();
  router.query.showGetOnListLink = "true";

  return (
    <>
      <Head>
        <title>{`Hal's List`}</title>
      </Head>
      <ProvidersGrid />
      {/* </> */}
    </>
  );
}
