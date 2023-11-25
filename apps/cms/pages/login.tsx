import { getSession, signIn, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth";

export const getServerSideProps = async (ctx: NextPageContext) => {
  let session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: ctx.query.callbackUrl ?? "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      query: ctx.query,
    },
  };
};

const Login = ({ query }) => {
  if (query.error) {
    return <h1>Error {query.error}</h1>;
  }
  signIn("imerza");
  return null;
};

export default Login;
