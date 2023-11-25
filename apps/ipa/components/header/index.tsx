/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC } from 'react';
import { Group, Title } from '@mantine/core';
import { HeaderStyle } from './header.style';

const useStyles = HeaderStyle;

type HeaderProps = {
  name: string;
  leftSection?: JSX.Element;
  centerSection?: JSX.Element;
  rightSection?: JSX.Element;
};

const Header: FC<HeaderProps> = ({
  name,
  leftSection,
  centerSection,
  rightSection,
}) => {
  const { classes } = useStyles({ activeMenu: null });

  return (
    <Group position={"apart"} align={"center"} className={classes.header}>
      <Group spacing={"lg"}>
        <Title className={classes.title}>{name}</Title>
        {leftSection}
      </Group>
      {centerSection}
      <Group spacing={"lg"}>
        {rightSection}
        {/*<SiteMenu />*/}
      </Group>
    </Group>
  );
};
export default Header;
