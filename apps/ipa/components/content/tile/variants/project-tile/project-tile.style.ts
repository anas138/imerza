/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { createStyles } from "@mantine/core";

export const ProjectTileStyle = createStyles((theme, { hovered }: { hovered: boolean }) => ({
  tile: {
    position: "relative",
    aspectRatio: "1/1",
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[4]
        : theme.colors.dark[4],
    outline: "solid",
    outlineWidth: 0.2,
    outlineColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],
    boxShadow: hovered && theme.shadows.sm,
  },
}));
