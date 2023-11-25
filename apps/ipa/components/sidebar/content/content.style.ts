/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { createStyles } from '@mantine/core';

export const ContentStyle = createStyles(
  (theme, { active }: { active: boolean }) => ({
    pageLink: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    primary: {
      height: 60,
      width: "100%",
      display: "flex",
      alignItems: "center",
      color: active
        ? theme.colors.red[7]
        : theme.colorScheme === "dark"
        ? theme.colors.white
        : theme.colors.dark[4],
      // backgroundColor:
      //   active && (
      //     theme.colorScheme == 'dark'
      //       ? theme.fn.rgba(theme.colors.dark[3], 0.25)
      //       : theme.fn.rgba(theme.colors.gray[4], 0.4)
      //   ),
      "&:hover": {
        backgroundColor:
          !active &&
          (theme.colorScheme == "dark"
            ? theme.fn.rgba(theme.colors.dark[3], 0.5)
            : theme.fn.rgba(theme.colors.gray[4], 0.2)),
      },
    },
    secondary: {
      position: "absolute",
      right: 10,
      zIndex: 150,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.white
          : theme.colors.dark[4],
      "&:hover": {
        backgroundColor:
          theme.colorScheme == "dark"
            ? theme.fn.rgba(theme.colors.dark[3], 0.5)
            : theme.fn.rgba(theme.colors.gray[4], 0.2),
      },
      "&:disabled": {
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[3],
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[1],
        border: "transparent",
      },
    },
    pageLinkDivider: {
      marginTop: 5,
      marginBottom: 5,
      marginLeft: theme.spacing.sm,
      marginRight: theme.spacing.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[4],
    },
    galleryLink: {
      width: "100%",
      padding: 3,
      marginTop: 4,
      marginBottom: 4,
      paddingLeft: active ? 26 : 28,
      paddingRight: theme.spacing.xl,
      backgroundColor: active && theme.fn.rgba(theme.colors.red[6], 0.2),
      borderRight: active && "solid 4px " + theme.colors.red[6],
      outline: active && "none",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[2]
          : theme.colors.gray[7],
      "&:hover": {
        backgroundColor:
          theme.colorScheme == "dark"
            ? theme.fn.rgba(theme.colors.gray[2], 0.2)
            : theme.fn.rgba(theme.colors.gray[5], 0.2),
      },
    },
    galleryName: {
      letterSpacing: 0.3,
    },
    mediaCount: {
      color: theme.colors.gray[6],
    },
    galleryLinkDivider: {
      marginLeft: theme.spacing.md,
      marginRight: theme.spacing.md,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[3],
    },
  })
);
