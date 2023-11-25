import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function AdminProtectedRoute(Cmp) {
  function render() {
    const { data: session } = useSession();
    const [user, setUser] = useState(null);
    const router = useRouter();
    useEffect(() => {
      const token = session?.user["access_token"];
      if (token) {
        const decode = jwt_decode(token);
        console.log(decode, "token");
        setUser(decode);
      }
    }, [session]);

    if (user?.role === "Admin") return <Cmp decode={user}></Cmp>;
    else return <h2>Admin protected Route</h2>;
  }
  return render;
}

export default AdminProtectedRoute;
