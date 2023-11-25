import { FC } from "react";
import { Card, Space, Title, useMantineTheme } from "@mantine/core";

type UsersContainerProps = {
  label: string;
  children;
};

const UsersContainer: FC<UsersContainerProps> = ({ label, children }) => {
  const theme = useMantineTheme();

  return (
    <Card
      p={"xs"}
      withBorder
      radius="md"
      style={{
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors.dark[6], 0.2)
            : theme.fn.rgba(theme.colors.gray[4], 0.3),
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2],
      }}
    >
      <Card.Section p={"xs"}>
        <Title order={4} weight={500} ml={3}>
          {label}
        </Title>
      </Card.Section>
      <Space h={"xs"} />
      {children}
    </Card>
  );
};

export default UsersContainer;
