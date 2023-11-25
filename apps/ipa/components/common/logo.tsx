import { useMantineTheme } from "@mantine/core";
import diamondLight from "../../public/diamond-light.png";
import diamondDark from "../../public/diamond-dark.png";
import logoLight from "../../public/logo-light.png";
import logoDark from "../../public/logo-dark.png";
import Image from "next/image";
import { FC } from "react";

type LogoProps = {
  small?: boolean;
};

const Logo: FC<LogoProps> = ({ small }) => {
  const theme = useMantineTheme();

  return (
    <Image
      src={
        small
          ? theme.colorScheme === "dark"
            ? diamondDark
            : diamondLight
          : theme.colorScheme === "dark"
          ? logoDark
          : logoLight
      }
      alt={"ImerzaLogo"}
    />
  );
};
export default Logo;
