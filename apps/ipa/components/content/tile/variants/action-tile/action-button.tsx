/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { Flex, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import { ActionTileStyle } from "./action-tile.style";

const useStyles = ActionTileStyle;

type GridButtonProps = {
  vertical?: boolean;
  label: JSX.Element;
  icon: JSX.Element;
  onClick: () => void;
};

const GridButton: FC<GridButtonProps> = ({
  vertical,
  label,
  icon,
  onClick,
}) => {
  /* Styles */
  const { classes } = useStyles();

  return (
    <UnstyledButton
      className={`${classes.button} ${classes.theme}`}
      onClick={onClick}
    >
      <Flex
        gap="xs"
        justify="center"
        align="center"
        direction={vertical ? "column" : "row"}
      >
        {icon}
        <Text className={classes.label} align={vertical ? "center" : "left"}>
          {label}
        </Text>
      </Flex>
    </UnstyledButton>
  );
};
export default GridButton;
