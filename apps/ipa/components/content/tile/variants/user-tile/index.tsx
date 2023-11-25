/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC } from "react";
import { UserTileStyle } from "./user-tile.style";
import { useHover } from "@mantine/hooks";
import { Box, Center, Flex, Stack, Text, Transition } from "@mantine/core";
import Options from "../../options";
import Logo from "../../../../common/logo";
import { IconUser } from "@tabler/icons-react";

const useStyles = UserTileStyle;

type UserTileProps = {
  id: any;
  name?: string;
  label?: string;
  options?: [string, (any) => any][];
  internal?: boolean;
};

const UserTile: FC<UserTileProps> = ({
  id,
  name,
  label,
  options,
  internal,
}) => {
  /* Mantine Hover hook, used to reveal Banner and Options overlays */
  const { hovered, ref } = useHover();

  /* Styles | Hovered: When tile is hovered over */
  const { classes } = useStyles({
    hovered: hovered,
  });

  return (
    <Box className={classes.tile} ref={ref}>
      <Transition transition={"fade"} mounted={hovered} duration={50}>
        {(styles) => <Options actions={options} location={"top-right"} />}
      </Transition>
      <Box style={{ height: "100%", width: "100%" }}>
        <Flex
          gap={"10%"}
          direction={"column"}
          justify="center"
          align="center"
          style={{ height: "100%", width: "100%" }}
        >
          <Center className={classes.iconContainer}>
            {internal ? (
              <Logo small />
            ) : (
              <IconUser
                style={{ height: "85%", width: "85%" }}
                strokeWidth={1.2}
              />
            )}
          </Center>
          <Stack spacing={2} align={"center"}>
            {name}
            <Text
              size={12}
              align={"center"}
              color={"dimmed"}
              lineClamp={2}
              mx={6}
            >
              {label}
            </Text>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default UserTile;
