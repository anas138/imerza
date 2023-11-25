/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { Grid, Menu, Transition } from "@mantine/core";
import { useState } from "react";
import { AppSwitcherStyle } from "./app-switcher.style";
import getPage from "../../../lib/get-page";
import AppProperties from "./app-properties";
import Toggle from "./toggle";
import App from "./app";
import { useSession } from "next-auth/react";

const useStyles = AppSwitcherStyle;

const AppSwitcher = () => {
  const [openTray, setOpenTray] = useState(false);
  const { data: session } = useSession();
  let currentApp = getPage();
  let appCount = Object.keys(AppProperties).length;
  let disableSwitcher = currentApp[0] == "admin" || appCount <= 1;

  const { classes } = useStyles({ activeTray: openTray, activeApp: null });

  return (
    <>
      <Menu
        opened={openTray}
        onClose={() => setOpenTray(false)}
        position="right-start"
        offset={22}
        width={214}
        disabled={disableSwitcher}
      >
        <Menu.Target>
          <Toggle openTray={openTray} onClick={() => setOpenTray(!openTray)} />
        </Menu.Target>
        <Transition
          mounted={openTray}
          transition="fade"
          duration={300}
          exitDuration={300}
        >
          {(styles) => (
            <Menu.Dropdown
              className={classes.tray}
              style={styles}
              onClick={() => setOpenTray(false)}
            >
              <Grid>
                <App app={"collateral"} currentApp={currentApp} />
                {session?.user["role"] === "Admin" && (
                  <App app={"settings"} currentApp={currentApp} />
                )}
                {session?.user["role"] === "Admin" && (
                  <App app={"admin"} currentApp={currentApp} />
                )}
              </Grid>
            </Menu.Dropdown>
          )}
        </Transition>
      </Menu>
    </>
  );
};
export default AppSwitcher;
