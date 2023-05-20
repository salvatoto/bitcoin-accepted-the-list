import Container from "../components/container";
import Intro from "../components/intro";
import Layout from "../components/layout";
import Head from "next/head";


export default function Index({}) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`Hal's List`}</title>
        </Head>
        <div className="flex justify-between">
          <Container>
            <Intro />
          </Container> 
        </div>
      </Layout>
    </>
  );
}


// export const getStaticProps = async () => {
//   const allPosts = getAllPosts([
//     "title",
//     "date",
//     "slug",
//     "author",
//     "coverImage",
//     "excerpt",
//   ]);

//   return {
//     props: { allPosts },
//   };
// };
