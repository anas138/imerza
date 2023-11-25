import { createStyles } from "@mantine/core";

export const FormStyle = createStyles((theme) => ({
  textInput: {
    borderRadius: 6,
    paddingLeft: 10,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    outline: "solid",
    outlineWidth: 0.8,
    outlineColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[3],
  },
}));
