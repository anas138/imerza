import { SessionProvider } from "next-auth/react";
import "../styles/index.css";
import { AppShell } from "@mantine/core";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AppShell
        padding={'md'}
      >
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  );
}
