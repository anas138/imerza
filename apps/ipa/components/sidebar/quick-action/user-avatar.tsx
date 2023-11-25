/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { Avatar, Text } from '@mantine/core';
import { QuickActionStyle } from './quick-action.style';

const useStyles = QuickActionStyle;

const UserAvatar = () => {
  return (
    <Avatar radius="md" size={32} variant={"filled"} color={"red.7"}>
      <Text>DE</Text>
    </Avatar>
  );
};

export default UserAvatar;
