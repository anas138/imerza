/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC } from "react";
import { MediaTileStyle } from "./media-tile.style";
import { useHover } from "@mantine/hooks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Flex,
  LoadingOverlay,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import MediaTileProperties from "./media-tile-properties";
import Options from "../../options";
import Banner from "../../banner";
import { IconBoxMultiple, IconGripVertical } from "@tabler/icons-react";
import Link from "next/link";
import { url } from "inspector";

const useStyles = MediaTileStyle;

type MediaTileProps = {
  id: any;
  variant: "galleries" | "gallery" | "allMedia" | "existingMedia";
  label?: string;
  options?: [string, (any) => any][];
  url?: any;
  path?: string;
  onClick?: (url:any) => void;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  selectImage?:(url:string,id:string)=>void
};
const MediaTile: FC<MediaTileProps> = ({
  id,
  variant,
  label,
  options,
  url,
  path,
  onClick,
  selected,
  onSelect,
  selectImage
}) => {
  // TODO: TEMPORARY connect loading of image
  const loading = false;

  /* Mantine Hover hook, used to reveal Banner and Options overlays */
  const { hovered, ref } = useHover();

  /* Start of Drag and Drop Kit Logic */
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  /* End of DND Kit Logic */

  /* Styles | Active: Enabled when tile is being dragged | Selected: When existing media is selected | Hovered: When tile is hovered over */
  const { classes } = useStyles({
    active: isDragging,
    selected: selected,
    hovered: hovered,
  });
  return (
    <div ref={setNodeRef} style={{ ...style }}>
      <Box className={classes.tile} ref={ref}>
        <Transition
          transition={"fade"}
          mounted={
            hovered &&
            isDragging == false &&
            MediaTileProperties[variant].menu == true &&
            loading == false
          }
          duration={50}
        >
          {(styles) => (
            <Options
              actions={options}
              location={MediaTileProperties[variant].menuLocation}
            />
          )}
        </Transition>
        <Transition
          transition={"fade"}
          mounted={
            (variant == "galleries" || hovered) &&
            isDragging == false &&
            MediaTileProperties[variant].banner == true
          }
          duration={50}
        >
          {(styles) => (
            <Banner
              label={label}
              location={MediaTileProperties[variant].bannerLocation}
              textPosition={MediaTileProperties[variant].textPosition}
              reorder={
                MediaTileProperties[variant].reorder && (
                  <Box {...attributes} {...listeners}>
                    <IconGripVertical size={20} />
                  </Box>
                )
              }
            />
          )}
        </Transition>
        {loading ? (
          <LoadingOverlay visible />
        ) : (
          <Link href={path ? path : "#"}>
            <UnstyledButton
              style={{ height: "100%", width: "100%" }}
              onClick={
               variant == "existingMedia" ? () => {onSelect(!selected);selectImage(url,id)} : onClick
              }
            >
              {variant == "galleries" && (
                <Flex
                  justify="center"
                  align="center"
                  style={{ height: "100%", width: "100%" }}
                >
                  <IconBoxMultiple
                    style={{ height: "35%", width: "35%" }}
                    strokeWidth={1.2}
                  />
                </Flex>
              )}
              {(variant == "gallery" ||
                variant == "allMedia" ||
                variant == "existingMedia") && (
                <img
                  alt={`Image ${url} ${id}`}
                  src={`${url}`}
                  height="100%"
                  width="100%"
                  style={{ objectFit: "contain" }}
                />
              )}
            </UnstyledButton>
          </Link>
        )}
      </Box>
    </div>
  );
};

export default MediaTile;
