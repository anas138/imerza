/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import React, { FC } from 'react';
import { TextInput, useMantineTheme } from '@mantine/core';

type InputTextProps = {
  name?: string;
  label?: string;
  value?: any;
  placeholder?: string;
  onChange: (any) => void;
  width?: number;
  asterisk?: boolean;
  error?: string;
  rightSection?: JSX.Element;
};

const InputText: FC<InputTextProps> = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  width,
  asterisk,
  error,
  rightSection,
}) => {
  const theme = useMantineTheme();

  return (
    <TextInput
      name={name}
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      w={width}
      withAsterisk={asterisk}
      error={error}
      variant={"filled"}
      rightSection={rightSection}
      styles={{
        input: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.fn.rgba(theme.colors.gray[3], 0.5),
        },
        label: {
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[2]
              : theme.colors.gray[6],
        },
      }}
    />
  );
};

export default InputText;
