import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  page: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    outline: "solid",
    outlineWidth: 0.2,
    outlineColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.red[7], 0.5)
        : theme.fn.rgba(theme.colors.red[5], 0.6),
  },
}));

const ExternalPageContainer = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.page}>
      <Box className={classes.container}>{children}</Box>
    </Box>
  );
};
export default ExternalPageContainer;
