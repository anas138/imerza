/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { QuickActionStyle } from "./quick-action.style";

const useStyles = QuickActionStyle;

const ThemeToggle = () => {
  const { classes } = useStyles();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      size={"lg"}
      onClick={() => toggleColorScheme()}
      className={classes.button}
    >
      {dark ? (
        <IconSun size={24} strokeWidth={1.6} />
      ) : (
        <IconMoonStars size={24} strokeWidth={1.6} />
      )}
    </ActionIcon>
  );
};

export default ThemeToggle;
