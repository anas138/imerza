import { Button } from "@mantine/core";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Text } from "@mantine/core";

import { decode } from "jsonwebtoken";
import getImerzaClient from "../lib/imerza-client";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
console.log(session.accessToken)
  // const client = getImerzaClient(session.accessToken);
  // console.log(await decode(session.accessToken as string));

  return {
    props: {
      // ...((await decode(session.accessToken as string)) as Object),
    },
  };
};

const Index = (props) => {
  console.log(props);

  const { data: session } = useSession({
    required: true,
  });

  useEffect(() => {
    if (session) {
      const client = getImerzaClient(session?.accessToken);
      client.Collateral.listGalleries().then(console.log);
      console.log(client);
    }

    if (session?.error === "RefreshAccessTokenError") {
      signIn("imerza"); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <>
      <Text size="xl">
        CMS
      </Text>
      <Button onClick={() => signIn("imerza")}>Sign in</Button>
    </>
  );
};

export default Index;
