/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { createStyles } from "@mantine/core";

export const MediaTileStyle = createStyles(
  (theme, { active, selected, hovered }: { active: boolean; selected: boolean; hovered: boolean }) => ({
    tile: {
      position: "relative",
      aspectRatio: "1/1",
      width: "100%",
      opacity: active ? "0" : "1",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[4]
          : theme.colors.dark[4],
      outline: "solid",
      outlineWidth: selected ? 1.5 : 0.2,
      outlineColor: selected
        ? theme.colorScheme === "dark"
          ? theme.colors.red[7]
          : theme.colors.red[4]
        : theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],
      boxShadow: hovered && theme.shadows.sm,
    },
  })
);
