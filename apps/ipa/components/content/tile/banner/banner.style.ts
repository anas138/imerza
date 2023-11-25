import { createStyles } from "@mantine/core";

export const BannerStyle = createStyles(
  (theme, { location }: { location: string }) => ({
    label: {
      position: "absolute",
      top: location.includes("top") && 0,
      bottom: location.includes("bottom") && 0,
      left: 0,
      width: "100%",
      height: 30,
      paddingLeft: 9,
      paddingRight: 9,
      gap: 4,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors.dark[4], 0.9)
          : theme.fn.rgba(theme.colors.gray[3], 0.9),
      color:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.white, 0.7)
          : theme.fn.rgba(theme.colors.dark[4], 0.7),
    },
  })
);
