import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ExternalPageContainer from "../../components/content/container/external-page-container";
import SignUpForm from "../../components/form/sign-up";
import { postRequest } from "../../context/apis";
import { redirect } from "next/dist/server/api-utils";

const SignUp = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(null);
  const router = useRouter();
  const email = router?.query.signUp;

  useEffect(() => {
    if (email) verifyEmail();
    return () => {
      setVerified(null);
    };
  }, [email, session]);
  const verifyEmail = async () => {
    const response = await postRequest("auth/verify", {
      email: email,
    });
    setVerified(response.status);
  };

  const createPassword = async (password) => {
    const response = await postRequest("auth/setpassword", {
      email: email,
      password: password,
    });
    if (response.status === 201) {
      //router.push("/login");
      const user = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });
      if (!user?.error) {
        router.push("/collateral/generated");
      } else {
        setError("Invalid Credentials");
      }
    }
  };

  // if (status === "authenticated") {
  //   router.push("/");
  // }
  return (
    <ExternalPageContainer>
      {verified && (
        <SignUpForm createPassword={createPassword} message={error} />
      )}
    </ExternalPageContainer>
  );
};

export default SignUp;
