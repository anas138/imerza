import { FC } from "react";
import { ButtonStyle } from "./button.style";
import { UnstyledButton } from "@mantine/core";
import ButtonProperties from "./button-properties";

const useStyles = ButtonStyle;

type ActionButtonProps = {
  variant: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: FC<ActionButtonProps> = ({
  variant,
  onClick,
  disabled,
}) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton
      style={{ color: ButtonProperties[variant]?.color }}
      className={classes.button}
      onClick={onClick}
      disabled={disabled}
      type={ButtonProperties[variant]?.type}
    >
      <span className={classes.icon}>{ButtonProperties[variant]?.icon}</span>
      <span className={classes.label}>{ButtonProperties[variant]?.label}</span>
    </UnstyledButton>
  );
};

export default Button;
