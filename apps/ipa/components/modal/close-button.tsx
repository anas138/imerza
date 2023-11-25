import { FC } from "react";
import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { ModalStyle } from "./modal.style";

const useStyles = ModalStyle;

type CloseButtonProps = {
  onClick: () => void;
};

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  const { classes } = useStyles();

  return (
    <ActionIcon size={"lg"} onClick={onClick} className={classes.closeButton}>
      <IconX strokeWidth={1.4} />
    </ActionIcon>
  );
};

export default CloseButton;
