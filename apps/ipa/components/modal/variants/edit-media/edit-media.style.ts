import { createStyles } from "@mantine/core";

export const EditMediaStyle = createStyles((theme) => ({
  label: {
    color: theme.fn.rgba(theme.white, 0.8),
  },
  editButton: {
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors.dark[5], 0.9)
          : theme.fn.rgba(theme.black, 0.2),
    },
  },
  mediaContainer: {
    height: 750,
    paddingLeft: 80,
    paddingRight: 80,
  },
  media: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
}));
