import { createStyles } from "@mantine/core";

export const styles = createStyles((theme) => ({
  theme: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : "#E9ECEF",
    color:
      theme.colorScheme === "dark"
      ? theme.colors.dark[1]
      : theme.colors.gray[7],
  },
}));