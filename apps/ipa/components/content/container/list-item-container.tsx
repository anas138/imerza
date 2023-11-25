/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { ActionIcon, Box, createStyles, Group } from '@mantine/core';
import { IconGripVertical, IconX } from '@tabler/icons-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

const useStyles = createStyles((theme, { active }: { active: boolean }) => ({
  container: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    borderRadius: 3,
    marginBottom: 6,
    padding: 6,
    paddingLeft: 12,
    paddingRight: 10,
    userSelect: "none",
    opacity: active ? "0" : "1",
  },
  dragHandle: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },
}));

type ListItemContainerProps = {
  id: any;
  reorder?: boolean;
  children;
};

const ListItemContainer: FC<ListItemContainerProps> = ({
  id,
  reorder,
  children,
}) => {
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

  /* Styles | Active: Enabled when tile is being dragged */
  const { classes } = useStyles({
    active: isDragging,
  });

  return (
    <div ref={setNodeRef} style={{ ...style }}>
      <Box className={classes.container}>
        <Group position={"apart"}>
          <Group>
            {reorder && (
              <Box
                className={classes.dragHandle}
                {...attributes}
                {...listeners}
              >
                <IconGripVertical size={20} />
              </Box>
            )}
            {children}
          </Group>
          <ActionIcon onClick={() => null}>
            <IconX size={22} strokeWidth={1.4} color={"#FA5252"} />
          </ActionIcon>
        </Group>
      </Box>
    </div>
  );
};
export default ListItemContainer;
