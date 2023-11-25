import { createStyles } from '@mantine/core';

export const ActionTileStyle = createStyles((theme) => ({
  tile: {
    width: "100%",
    aspectRatio: "1/1",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  theme: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[4]
        : theme.colors.dark[4],
    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[4],
    },
  },
  button: {
    height: "100%",
    width: "100%",
    borderRadius: "5px",
  },
  label: {
    width: '50%',
    wordBreak: 'break-word'
  }
}));
