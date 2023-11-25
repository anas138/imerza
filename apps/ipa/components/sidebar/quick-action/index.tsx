import React from "react";
import { Box } from "@mantine/core";
import UserAvatar from "./user-avatar";
import ThemeToggle from "./theme-switcher";
import Logout from "./logout";
import { QuickActionStyle } from "./quick-action.style";

const useStyles = QuickActionStyle;

const QuickActions = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.controlTray}>
      <UserAvatar />
      <ThemeToggle />
      <Logout />
    </Box>
  );
};
export default QuickActions;
