import { createStyles } from '@mantine/core';

export const UploadStyle = createStyles((theme) => ({
  dropzone: {
    height: 400,
    width: 750,
    // padding: 120,
    // paddingLeft: 150,
    // paddingRight: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "dashed",
    borderColor: theme.colors.blue[3],
    borderRadius: 8,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.white, 0.08)
        : theme.fn.rgba(theme.black, 0.36),
    color: theme.white,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.white, 0.1)
          : theme.fn.rgba(theme.black, 0.42),
    },
    "&[data-accept]": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.white, 0.08)
          : theme.fn.rgba(theme.black, 0.33),
      border: "solid",
      borderColor: theme.colors.green[6],
    },
    "&[data-reject]": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.white, 0.08)
          : theme.fn.rgba(theme.black, 0.33),
      border: "solid",
      borderColor: theme.colors.red[6],
    },
  },
}));
