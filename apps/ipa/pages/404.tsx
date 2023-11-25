import { useRouter } from "next/router";
import ExternalPageContainer from "../components/content/container/external-page-container";
import { Center, Group, Space, Stack, Title } from "@mantine/core";
import Button from "../components/common/button";
import Image from "next/image";
import Error404 from "../public/error-404.png";

const NotFound404 = () => {
  const router = useRouter();

  return (
    <ExternalPageContainer>
      <Group spacing={100} py={40}>
        <Stack>
          <Title align={"center"} size={120}>
            Oops...
          </Title>
          <Title align={"center"} order={2} weight={300} color={"dimmed"}>
            Looks like you're in a pickle!
          </Title>
          <Title align={"center"} order={4} weight={400} color={"dimmed"}>
            Error: Page Not Found 404
          </Title>
          <Space h={"lg"} />
          <Center>
            <Button variant={"back"} onClick={() => router.back()} />
          </Center>
        </Stack>
        <Image
          src={Error404}
          alt={"404 Not Found"}
          height={"420"}
          width={"200"}
          style={{ borderRadius: 12 }}
        />
      </Group>
    </ExternalPageContainer>
  );
};

export default NotFound404;
