import "../styles/index.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../context/contextProvider";
import Page from "./index";

export default function ImerzaApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const login = false;
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });
  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));

  useHotkeys([["mod+Y", () => toggleColorScheme()]]);

  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus
      refetchInterval={60}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: "Nunito, sans-serif",
            colors: {
              white: ["#FFFFFF"],
            },
          }}
        >
          <ModalsProvider>
            <UserProvider>
              <Page>
                <Component {...pageProps} />
              </Page>
            </UserProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}
