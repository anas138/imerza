import { ActionIcon } from "@mantine/core";
import { signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";
import { QuickActionStyle } from "./quick-action.style";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const useStyles = QuickActionStyle;

const Logout = () => {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <ActionIcon
      size={"lg"}
      onClick={async () => {
        await signOut({ redirect: false });
        router.push("/login");
      }}
      className={classes.button}
    >
      <IconLogout size={24} strokeWidth={1.6} />
    </ActionIcon>
  );
};
export default Logout;
