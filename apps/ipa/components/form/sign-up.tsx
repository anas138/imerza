import { FC, useState } from "react";
import {
  Center,
  Container,
  Group,
  PasswordInput,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Logo from "../common/logo";
import Button from "../common/button";
import { FormStyle } from "./form.style";

const useStyles = FormStyle;

type SignUpFormProps = {
  createPassword: (userObj: any) => {};
  message: string;
};

const SignUp: FC<SignUpFormProps> = ({ createPassword, message }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputs = (e, name) => {
    password[name] = e.target.value;
    setPassword(password);
    setDisabled(
      password.password.length == 0 || password.confirmPassword.length == 0
    );
  };

  const handleSubmit = () => {
    if (password.password != password.confirmPassword) {
      setError(true);
    } else {
      setError(false);
      console.log("Create User");
      createPassword(password.password)
    }
  };

  return (
    <Stack align={"center"} justify={"center"} w={300} py={30}>
      <Group align={"left"} noWrap pb={6}>
        <Center h={60} w={60}>
          <Logo small />
        </Center>
        <Center>
          <Title
            order={3}
            size={24}
            weight={300}
            color={"dimmed"}
            lineClamp={2}
            align={"center"}
          >
            Welcome "Username"
          </Title>
        </Center>
      </Group>
      <Text color={"dimmed"} align={"center"} weight={300}>
        Enter desired password to proceed:
      </Text>
      <Stack spacing={"md"} w={"100%"}>
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
        <PasswordInput
          placeholder="Confirm Password"
          onChange={(e) => {
            handleInputs(e, "confirmPassword");
          }}
          variant={"unstyled"}
          withAsterisk
          className={classes.textInput}
          pl={0}
        />
        <Text
          align={"center"}
          size={13}
          weight={300}
          color={theme.colors.red[6]}
        >
          {error && "Passwords Do Not Match"}
          {message}
        </Text>
      </Stack>
      <Container pt={3} pb={"xs"}>
        <Button variant={"signUp"} onClick={handleSubmit} disabled={disabled} />
      </Container>
    </Stack>
  );
};
export default SignUp;
