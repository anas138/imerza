/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC } from "react";
import { ProjectTileStyle } from "./project-tile.style";
import { useHover } from "@mantine/hooks";
import { Box, Flex, Transition, UnstyledButton } from "@mantine/core";
import Banner from "../../banner";
import Options from "../../options";
import Link from "next/link";
import { IconBoxMultiple } from "@tabler/icons-react";

const useStyles = ProjectTileStyle;

type ProjectTileProps = {
  id: any;
  label?: string;
  url?: string;
  path?: string;
  options?: [string, (any) => any][];
  click?: (project: string) => void;
  projectRoot: string;
};

const ProjectTile: FC<ProjectTileProps> = ({
  id,
  label,
  url,
  path,
  options,
  projectRoot,
  click,
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
        {(styles) => (
          <>
            <Banner
              label={label}
              location={"top"}
              textPosition={"flex-start"}
            />
            <Options actions={options} location={"bottom-right"} />
          </>
        )}
      </Transition>
      <Link href={path ? path : "#"}>
        <UnstyledButton
          style={{ height: "100%", width: "100%" }}
          onClick={() => {
            click(projectRoot);
          }}
        >
          {!url ? (
            <Flex justify={"center"} align={"center"}>
              <IconBoxMultiple
                style={{ height: "35%", width: "35%" }}
                strokeWidth={1.2}
              />
            </Flex>
          ) : (
            <img
              alt={`Image ${id}`}
              src={`${url}`}
              height="100%"
              width="100%"
              style={{ objectFit: "contain" }}
            />
          )}
        </UnstyledButton>
      </Link>
    </Box>
  );
};

export default ProjectTile;
