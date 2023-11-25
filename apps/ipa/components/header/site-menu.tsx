/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import {
  Avatar,
  Divider,
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconLogout, IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { HeaderStyle } from "./header.style";
import { useState } from "react";
import { useRouter } from "next/router";

const useStyles = HeaderStyle;

const SiteMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter()
  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const { classes } = useStyles({ activeMenu: openMenu });

  return (
    <Menu
      shadow="md"
      width={180}
      position={"bottom-end"}
      offset={10}
      closeOnItemClick={false}
      exitTransitionDuration={300}
      onChange={() => setOpenMenu(!openMenu)}
    >
      <Menu.Target>
        <UnstyledButton className={classes.menuIcon}>
          <IconMenu2 size={28} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={classes.menuDropdown}>
        <Menu.Item
          icon={
            <Avatar radius="xl" size="sm" variant={"filled"} color={"gray.3"}>
              <Text style={{ color: theme.colors.red[7] }}>DE</Text>
            </Avatar>
          }
          onClick={() => null}
          className={classes.menuItem}
          disabled={true}
        >
          Developer
        </Menu.Item>
        <Divider
          className={classes.divider}
          color={theme.fn.rgba(theme.white, 0.4)}
        />
        <Menu.Item
          icon={
            dark ? (
              <IconSun size={18} style={{ marginRight: 3 }} />
            ) : (
              <IconMoon size={18} style={{ marginRight: 3 }} />
            )
          }
          onClick={() => toggleColorScheme()}
          className={classes.menuItem}
          style={{ paddingLeft: 17 }}
        >
          {dark ? "Light" : "Dark"} Mode
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size={18} style={{ marginRight: 3 }} />}
          onClick={async() =>{ 
            await signOut({redirect:false})
            router.push("/login")
          }}
          className={classes.menuItem}
          style={{ paddingLeft: 17 }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SiteMenu;
