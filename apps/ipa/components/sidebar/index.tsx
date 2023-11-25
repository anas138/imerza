/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { Divider, Navbar } from "@mantine/core";
import Logo from "../common/logo";
import AppSwitcher from "./app-switcher";
import SidebarContent from "./content";
import QuickAction from "./quick-action";
import { SidebarStyle } from "./sidebar.style";

const useStyles = SidebarStyle;

const Sidebar = () => {
  const { classes } = useStyles();

  return (
    <Navbar width={{ base: 250 }} className={classes.navbar}>
      <Navbar.Section mt={24} mb={16} mx={"auto"} p={"sm"}>
        <Logo />
      </Navbar.Section>
      <Navbar.Section px={"xs"}>
        <AppSwitcher />
      </Navbar.Section>
      <Divider className={classes.divider} />
      <SidebarContent />
      <Navbar.Section>
        <QuickAction />
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
