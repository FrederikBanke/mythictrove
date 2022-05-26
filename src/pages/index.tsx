import { Card, Container, Row, Switch, Text, useTheme, } from "@nextui-org/react";
import { useTheme as useNextTheme, } from "next-themes";
import type { NextPage, } from "next";
import Head from "next/head";
import { useState, } from "react";
import HomepagePanel from "components/HomepagePanel";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [isHidden, setIsHidden] = useState(false);

  const hideNotice = () => {
    setIsHidden(true);
  };

  return (
    <div>
      <Head>
        <title>MythicTrove</title>
        <meta name="description" content="World building tool." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text h1 size={64}>
          <Text span
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
          >
            Mythic
          </Text>
          <Text span
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
          >
            Trove
          </Text>
        </Text>
        <Row fluid justify="center">
          <HomepagePanel />
        </Row>
        {!isHidden && <Card clickable hoverable
          onClick={hideNotice}
          css={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "200px",
            margin: "$5",
          }}
        >
          Under development.
          Progress may be lost.
          Click to dismiss.
        </Card>}
      </main>

      <footer>

      </footer>
    </div>
  );
};

export default Home;
