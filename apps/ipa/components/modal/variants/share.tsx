import React, { FC, useState } from "react";
import Modal from "../index";
import Button from "../../common/button";
import validateEmail from "../../../lib/validate-email";
import { postRequest } from "../../../context/apis";
import InputText from "../../common/input-text";

type ShareProps = {
  open: boolean;
  onClose: () => void;
  url: string;
};

const Share: FC<ShareProps> = ({ open, onClose, url }) => {
  const [recipientInput, setRecipientInput] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleInput = (event) => {
    if (event.currentTarget.value.length == 0) {
      setInvalid(false);
    }
    setRecipientInput(event.currentTarget.value);
  };

  const handleClose = () => {
    onClose();
    setInvalid(false);
    setRecipientInput("");
  };

  const handleSend = () => {
    if (validateEmail(recipientInput)) {
      shareImage();
      handleClose();
      console.log(`Sharing ${url} with ${recipientInput}`);
    } else {
      setInvalid(true);
    }
  };
  const shareImage = async () => {
    const payload = {
      email: recipientInput,
      image: url[0]["actual"],
    };
    const response = await postRequest("collateral/shareImage", payload);
  };
  return (
    <Modal
      label="Share"
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button
            variant={"send"}
            onClick={handleSend}
            disabled={
              recipientInput.length == 0 || !validateEmail(recipientInput)
            }
          />
        </>
      }
    >
      <InputText
        label={"Email"}
        placeholder={"recipient@email.com"}
        asterisk
        onChange={handleInput}
        error={invalid ? "Please enter valid email" : null}
      />
    </Modal>
  );
};

export default Share;
