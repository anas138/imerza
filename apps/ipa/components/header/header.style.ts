/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { createStyles } from "@mantine/core";

export const HeaderStyle = createStyles(
  (theme, { activeMenu }: { activeMenu: boolean }) => ({
    header: {
      height: 60,
      marginBottom: 8,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
    title: {
      fontSize: 30,
      fontWeight: 600,
      letterSpacing: 0.5,
      color:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.white, 0.7)
          : theme.fn.rgba(theme.colors.dark[5], 0.7),
    },
    menuIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: activeMenu
        ? theme.colorScheme === "dark"
          ? theme.colors.gray[3]
          : theme.colors.dark[4]
        : theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.dark[2],
      "&:hover": {
        color:
          theme.colorScheme === "dark"
            ? theme.colors.gray[3]
            : theme.colors.dark[4],
      },
    },
    menuDropdown: {
      backgroundColor: theme.colors.red[7],
      borderRadius: 5,
      border: "none",
    },
    menuItem: {
      marginTop: 1,
      marginBottom: 1,
      color: theme.white,
      transitionDuration: "200ms",
      "&:hover": {
        // padding: 10, //Animation
        backgroundColor: theme.fn.rgba(theme.white, 0.2),
      },
      "&:disabled": {
        // padding: 10, //Animation
        color: theme.white,
      },
    },
    divider: {
      marginLeft: theme.spacing.sm,
      marginRight: theme.spacing.sm,
      marginTop: 4,
      marginBottom: 4,
    },
    searchContainer: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      border: 'none'
    },
    textInput: {
      borderRadius: 6,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
      outline: "solid",
      outlineWidth: 0.8,
      outlineColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3],
    },
  })
);
