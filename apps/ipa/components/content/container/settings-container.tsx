import { FC } from "react";
import { Card, createStyles, Group, Space, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 6,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[6], 0.2)
        : theme.fn.rgba(theme.colors.gray[4], 0.3),
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
  },
}));

type SettingsContainerProps = {
  label: string;
  width: number;
  rightSection?: JSX.Element;
  children;
};

const SettingsContainer: FC<SettingsContainerProps> = ({
  label,
  width,
  rightSection,
  children,
}) => {
  const { classes } = useStyles();

  return (
    <Card withBorder p={"xs"} w={width} className={classes.card}>
      <Card.Section p={"xs"}>
        <Group position={"apart"}>
          <Title order={4} weight={500}>
            {label}
          </Title>
          {rightSection}
        </Group>
      </Card.Section>
      <Space h={"xs"} />
      {children}
    </Card>
  );
};

export default SettingsContainer;
