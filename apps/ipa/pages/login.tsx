import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ExternalPageContainer from "../components/content/container/external-page-container";
import LoginForm from "../components/form/login";

const Login = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();

  const loginUser = async (userObj) => {
    const user = await signIn("credentials", {
      username: userObj.username,
      password: userObj.password,
      redirect: false,
    });
    if (!user.error) {
      //router.push("/admin/projects");
    } else {
      setError("Invalid Credentials");
    }
  };

  if (status === "authenticated" && session?.user["role"] === "Client") {
    router.push("/collateral/generated");
  }
  if (status === "authenticated" && session?.user["role"] === "Admin") {
    router.push("/admin/projects");
  }
  return (
    <ExternalPageContainer>
      <LoginForm loginUser={loginUser} message={error} />
    </ExternalPageContainer>
  );
};

export default Login;
