import { Row, Switch, Text, useTheme, } from "@nextui-org/react";
import { useTheme as useNextTheme, } from "next-themes";
import ProjectSelector from "components/projectSelector/ProjectSelector";
import type { NextPage, } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
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
        <Row gap={1} align="center">
          <Text>Current theme: {type}</Text>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
        </Row>
        <ProjectSelector />
      </main>

      <footer>

      </footer>
    </div>
  );
};

export default Home;
