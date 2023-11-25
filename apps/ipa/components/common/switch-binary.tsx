/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import React, { FC } from 'react';
import { createStyles, Group, Switch, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  switch: {
    cursor: "pointer",
  },
}));

type SwitchBinaryProps = {
  name?: string;
  label: string;
  checked: any;
  onChange: (any) => void;
  updated: JSX.Element;
};

const SwitchBinary: FC<SwitchBinaryProps> = ({
  name,
  label,
  checked,
  onChange,
  updated,
}) => {
  const { classes } = useStyles();

  return (
    <Group position="apart" noWrap spacing="xl">
      <Text size={15}>{label}</Text>
      <Switch
        name={name}
        className={classes.switch}
        checked={checked}
        onChange={onChange}
        labelPosition={"left"}
        label={updated}
      />
    </Group>
  );
};

export default SwitchBinary;
