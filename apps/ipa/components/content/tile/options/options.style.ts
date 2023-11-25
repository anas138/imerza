import { createStyles } from "@mantine/core";

export const OptionsStyle = createStyles(
  (theme, { location }: { location: string }) => ({
    menuTarget: {
      position: "absolute",
      top: location.includes("top") && 3,
      bottom: location.includes("bottom") && 3,
      left: location.includes("left") && 3,
      right: location.includes("right") && 3,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors.dark[4], 0.9)
          : theme.fn.rgba(theme.colors.gray[3], 0.9),
      color:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.white, 0.5)
          : theme.fn.rgba(theme.colors.dark[4], 0.5),
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[3],
      },
    },
    menuDropdown: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
      borderWidth: 0.5,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[3],
    },
  })
);
