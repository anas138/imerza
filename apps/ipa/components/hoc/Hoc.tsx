import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
function HOC(Cmp) {
  function render() {
    const { data: session } = useSession();
    const router = useRouter();
    const token = session?.user["access_token"];
    if (token) {
      const decode = jwt_decode(token);
      console.log(decode, "token");
      return <Cmp decode={decode}></Cmp>;
    } else {
      return <h2>user is not login</h2>;
    }
  }
  return render;
}

export default HOC;
