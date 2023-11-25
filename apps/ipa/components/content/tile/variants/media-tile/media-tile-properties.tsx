import { IconBoxMultiple } from '@tabler/icons-react';
import { Flex } from '@mantine/core';

const MediaTileProperties = {
  galleries: {
    banner: true,
    bannerLocation: "bottom",
    textPosition: "center",
    reorder: false,
    menu: true,
    menuLocation: "top-right",
  },
  allMedia: {
    banner: true,
    bannerLocation: "top",
    textPosition: "flex-start",
    reorder: false,
    menu: true,
    menuLocation: "bottom-right",
  },
  gallery: {
    banner: true,
    bannerLocation: "top",
    textPosition: "flex-start",
    reorder: true,
    menu: true,
    menuLocation: "bottom-right",
  },
  existingMedia: {
    banner: false,
    bannerLocation: "top",
    textPosition: "flex-start",
    reorder: false,
    menu: false,
    menuLocation: "bottom-right",
  },
  project: {
    banner: true,
    bannerLocation: "top",
    textPosition: "flex-start",
    reorder: false,
    menu: true,
    menuLocation: "bottom-right",
  },
  user: {
    banner: false,
    bannerLocation: "bottom",
    textPosition: "center",
    reorder: false,
    menu: true,
    menuLocation: "bottom-right",
  },
};

export default MediaTileProperties;
