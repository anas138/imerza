/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC } from "react";
import getPage from "../../../lib/get-page";
import PageLinkProperties from "./page-link-properties";
import { ActionIcon, Box, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { ContentStyle } from "./content.style";

const useStyles = ContentStyle;

type SidebarItemProps = {
  page: string;
  secondaryAction?: () => void;
};

const PageLink: FC<SidebarItemProps> = ({ page, secondaryAction }) => {
  let currentApp = getPage();

  const { classes } = useStyles({
    active: PageLinkProperties[page].path.includes(currentApp[1]),
  });

  return (
    <Box className={classes.pageLink}>
      <Link href={PageLinkProperties[page].path}>
        <UnstyledButton className={classes.primary}>
          <Box ml={18} mr={14}>
            {PageLinkProperties[page].icon}
          </Box>
          <Text size={16} align={"center"}>
            {PageLinkProperties[page].label}
          </Text>
        </UnstyledButton>
      </Link>
      {secondaryAction && (
        <ActionIcon
          size="md"
          className={classes.secondary}
          onClick={secondaryAction}
        >
          {PageLinkProperties[page].secondaryIcon}
        </ActionIcon>
      )}
    </Box>
  );
};
export default PageLink;
