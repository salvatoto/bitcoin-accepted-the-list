import Container from "@/components/container";
import NewProviderForm from "@/components/new-provider-form";
import Layout from "../components/layout";
import Head from "next/head";
import BackgroundBox from "@/components/background-box";
import TitleAndLema from "@/components/title-and-lema";
import { useRouter } from "next/router";

// TODO:
// 1. Refactor Intro and pull out Home Icon
// 2. Add Home Icon here to go back

export default function FormCompletionPage({}) {
  // const router = useRouter();
  // router.query.showGetOnListLink = "false";

  return (
    <>
      <Layout>
        <Head>
          <title>{`Hal's List`}</title>
        </Head>
        <Container>
          <BackgroundBox className="mt-2 md:mt-16">
            <h1 className="mx-12 my-12 text-center text-3xl font-semibold text-black md:text-5xl">
              Thanks for submitting.
              <br /> We will review you submission and send you and e-mail soon.
            </h1>
          </BackgroundBox>
        </Container>
      </Layout>
    </>
  );
}
