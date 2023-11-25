/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { ContentStyle } from "./content.style";

const useStyles = ContentStyle;

type GalleryRowProps = {
  href: string;
  name: string;
  length: number;
  id: string;
};

const GalleryLink: FC<GalleryRowProps> = ({ href, name, length, id }) => {
  const router = useRouter();
  const { classes } = useStyles({ active: router.query.galleryId == id });

  return (
    <Link href={`/collateral/galleries/${encodeURIComponent(href)}`}>
      <a>
      <UnstyledButton className={classes.galleryLink}>
        <Group>
          <Stack spacing={2}>
            <Text className={classes.galleryName}>{name}</Text>
            <Text size="sm" weight={300} className={classes.mediaCount}>
              {length == 0
                ? "Empty"
                : length + " Item" + (length > 1 ? "s" : "")}
            </Text>
          </Stack>
        </Group>
      </UnstyledButton>
      </a>
    </Link>
  );
};
export default GalleryLink;
