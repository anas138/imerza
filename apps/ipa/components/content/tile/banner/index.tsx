/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC } from "react";
import { BannerStyle } from "./banner.style";
import { Box, Flex, Text } from "@mantine/core";

const useStyles = BannerStyle;

type BannerProps = {
  label: string;
  location: string;
  textPosition: string;
  reorder?: JSX.Element;
};

const Banner: FC<BannerProps> = ({
  label,
  location,
  textPosition,
  reorder,
}) => {
  const { classes } = useStyles({ location });

  return (
    <Flex className={classes.label} justify={textPosition} align={'center'}>
      <Box style={{paddingTop: 4}}>{reorder}</Box>
      <Text size={15} lineClamp={1}>{label}</Text>
    </Flex>
  );
};
export default Banner;
