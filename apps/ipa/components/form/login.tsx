import { FC, useState } from "react";
import {
  Box,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Logo from "../common/logo";
import Button from "../common/button";
import { FormStyle } from "./form.style";

const useStyles = FormStyle;

type LoginFormProps = {
  loginUser: (userObj: any) => Promise<void>;
  message: string;
};

const Login: FC<LoginFormProps> = ({ loginUser, message }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [user, setUser] = useState({
    username: null,
    password: null,
  });

  const handleInputs = (e, name) => {
    user[name] = e.target.value;
    setUser(user);
  };

  return (
    <Stack align={"center"} justify={"center"} w={300} py={30}>
      <Box w={285}>
        <Logo />
      </Box>
      <Title order={3} size={20} weight={300} color={"dimmed"} pt={4} pb={"sm"}>
        Welcome to Project Management
      </Title>
      <Stack spacing={"md"} style={{ width: 300 }}>
        <TextInput
          placeholder="Username"
          onChange={(e) => {
            handleInputs(e, "username");
          }}
          variant={"unstyled"}
          withAsterisk
          className={classes.textInput}
        />
        <PasswordInput
          placeholder="Password"
          onChange={(e) => {
            handleInputs(e, "password");
          }}
          variant={"unstyled"}
          withAsterisk
          className={classes.textInput}
          pl={0}
        />
        <Text
          align={"center"}
          size={"sm"}
          weight={300}
          color={theme.colors.red[6]}
        >
          {message}
        </Text>
      </Stack>
      <Container pt={3} pb={"xs"}>
        <Button variant={"signIn"} onClick={() => loginUser(user)} />
      </Container>
    </Stack>
  );
};
export default Login;
