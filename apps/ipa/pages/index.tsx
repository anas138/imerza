import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AppShell } from "@mantine/core";
import Sidebar from "../components/sidebar";
import getPage from "../lib/get-page";
import Login from "./login";

const Page = ({ children }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("imerza"); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <>
      {!session?.user?.name ? (
        <AppShell
          fixed
          navbar={<Sidebar />}
          hidden={
            getPage()[0].includes("login") || getPage()[0].includes("404") || getPage()[0].includes("sign-up")
          }
        >
          {children}
        </AppShell>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Page;
