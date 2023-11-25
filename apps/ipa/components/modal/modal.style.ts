import { createStyles } from "@mantine/core";

export const ModalStyle = createStyles((theme) => ({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: 16,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[7], 0.9)
        : theme.fn.rgba(theme.black, 0.5),
  },
  actionContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    padding: 14,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 5,
    border: "solid",
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    borderWidth: 1,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  closeButton: {
    color: theme.colors.red[6],
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[6], 0.9)
        : theme.fn.rgba(theme.black, 0.3),
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors.dark[5], 0.9)
          : theme.fn.rgba(theme.black, 0.2),
    },
  },
}));
