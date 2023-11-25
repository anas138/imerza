/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { Box, Flex, Stack } from "@mantine/core";
import { FC } from "react";
import { ActionTileStyle } from "./action-tile.style";

const useStyles = ActionTileStyle;

type ActionTileProps = {
  buttons: JSX.Element[];
};

const ActionTile: FC<ActionTileProps> = ({ buttons }) => {
  /* Styles */
  const { classes } = useStyles();

  /* Dynamically takes in array of Action-Button(s) and returns 1 of 4 structuring variants */
  switch (buttons.length) {
    case 1:
      return <Box className={classes.tile}>{buttons[0]}</Box>;
    case 2:
      return (
        <Box className={classes.tile}>
          <Stack spacing={10} className={classes.container}>
            {buttons[0]}
            {buttons[1]}
          </Stack>
        </Box>
      );
    case 3:
      return (
        <Box className={classes.tile}>
          <Flex direction={"row"} gap={10} className={classes.container}>
            <Stack spacing={10} className={classes.container}>
              {buttons[0]}
              {buttons[1]}
            </Stack>
            <Stack spacing={10} className={classes.container}>
              {buttons[2]}
            </Stack>
          </Flex>
        </Box>
      );
    case 4:
      return (
        <Box className={classes.tile}>
          <Flex direction={"row"} gap={10} className={classes.container}>
            <Stack spacing={10} className={classes.container}>
              {buttons[0]}
              {buttons[1]}
            </Stack>
            <Stack spacing={10} className={classes.container}>
              {buttons[2]}
              {buttons[3]}
            </Stack>
          </Flex>
        </Box>
      );
  }
};
export default ActionTile;
