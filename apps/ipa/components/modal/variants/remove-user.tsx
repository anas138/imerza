import { FC } from "react";
import Modal from "../index";
import Button from "../../common/button";
import { Text } from "@mantine/core";

type RemoveUserProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  username: string;
};

const RemoveUser: FC<RemoveUserProps> = ({ open, onClose, id, username }) => {
  /* Start of Handlers */
  const handleClose = () => {
    onClose();
  };

  const handleRemove = () => {
    console.log(`Removing User ID ${id}`);
  };
  /* End of Handlers */

  return (
    <Modal
      label={`Remove User`}
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button variant={"confirm"} onClick={handleRemove} />
        </>
      }
    >
      <Text color={"dimmed"}>Are you sure you wish to remove <Text span fs="italic" mr={2}>{username}</Text>?</Text>
    </Modal>
  );
};

export default RemoveUser;
