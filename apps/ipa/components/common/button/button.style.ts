import { createStyles } from "@mantine/core";

export const ButtonStyle = createStyles((theme) => ({
  button: {
    height: "36px",
    width: "130px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.fn.rgba(theme.colors.gray[3], 0.5),
    border: "solid",
    borderWidth: 0.7,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[3],
    borderRadius: "5px",
    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.fn.rgba(theme.colors.gray[3], 0.8),
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "default",
      "&:hover": {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[2],
      },
    },
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
  },
}));
