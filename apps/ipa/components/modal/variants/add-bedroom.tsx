import React, { FC, useState } from "react";
import Modal from "../index";
import Button from "../../common/button";
import InputText from "../../common/input-text";

type AddBedroomProps = {
  open?: boolean;
  onClose?: () => void;
};

const AddBedroom: FC<AddBedroomProps> = ({ open, onClose }) => {
  // const [openAddGallery, setOpenAddGallery] = useState(false);
  const [bedroomInput, setBedroomInput] = useState("");

  const handleInput = (event) => {
    setBedroomInput(event.currentTarget.value);
  };

  const handleClose = () => {
    onClose();
    setBedroomInput("");
  };

  const handleCreate = () => {
    onClose();
    console.log(`Added Bedroom: ${bedroomInput}`);
  };

  return (
    <Modal
      label="Add Bedroom"
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button
            variant={"create"}
            onClick={handleCreate}
            disabled={bedroomInput.length == 0}
          />
        </>
      }
    >
      <InputText
        label={"Option"}
        placeholder={"Label"}
        asterisk
        onChange={handleInput}
      />
    </Modal>
  );
};

export default AddBedroom;
