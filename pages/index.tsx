import { useRouter } from "next/router";
import Layout from "../components/layout";
import ProvidersGrid from "@/components/providers-grid";
import Footer from "@/components/footer";

export default function Index({}) {
  const router = useRouter();
  router.query.showGetOnListLink = "true";

  return (
    <>
      <ProvidersGrid />
      <Footer />
    </>
  );
}
