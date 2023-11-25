/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import React, { FC } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { HeaderStyle } from "./header.style";

const useStyles = HeaderStyle;

type SearchProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Search: FC<SearchProps> = ({ onChange }) => {
  const { classes } = useStyles({ activeMenu: null });

  return (
    <TextInput
      variant={"unstyled"}
      placeholder={"Search"}
      icon={<IconSearch size={16} stroke={1.5} />}
      className={classes.textInput}
      onChange={onChange}
    />
  );
};

export default Search;
