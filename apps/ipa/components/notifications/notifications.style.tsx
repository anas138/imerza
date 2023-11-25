/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { createStyles } from "@mantine/core";

export const NotificationsStyle = createStyles(
  (theme, { minimize }: { minimize: boolean }) => ({
    notificationTray: {
      minHeight: minimize && 50,
      width: "250px",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
      borderRadius: 5,
      boxShadow: theme.shadows.md,
      outline: "solid",
      outlineWidth: 0.8,
      outlineColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3],
    },
    title: {
      height: 50,
      width: "100%",
      padding: 10,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3],
      borderRadius: 5,
    },
    button: {
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[3]
            : theme.colors.gray[4],
      },
    },
    item: {
      padding: 7,
      marginRight: 5,
    },
    preview: {
      height: 30,
      width: 70,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3],
    },
    status: {
      height: 30,
      width: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);
