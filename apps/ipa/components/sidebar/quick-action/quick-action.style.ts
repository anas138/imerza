/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { createStyles } from '@mantine/core';

export const QuickActionStyle = createStyles((theme) => ({
  controlTray: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    height: 60,
    margin: 10,
    borderRadius: theme.radius.md,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[3],
  },
  button: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[3],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[2]
        : theme.colors.gray[7],
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[4],
    },
  },
}));
