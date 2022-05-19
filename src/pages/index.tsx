import ProjectSelector from "components/projectSelector/ProjectSelector";
import type { NextPage, } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>MythicTrove</title>
        <meta name="description" content="World building tool." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Mythic Trove
        </h1>
        <ProjectSelector />
      </main>

      <footer>

      </footer>
    </div>
  );
};

export default Home;
