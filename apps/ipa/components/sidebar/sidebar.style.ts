/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { createStyles } from "@mantine/core";

export const SidebarStyle = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
  },
  divider: {
    marginTop: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    marginBottom: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[4],
  },
}));
