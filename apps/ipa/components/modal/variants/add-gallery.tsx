import React, { FC, useState } from "react";
import Modal from "../index";
import Button from "../../common/button";
import InputText from "../../common/input-text";

type AddGalleryProps = {
  addGallery?: (data: Object) => void;
  open?: boolean;
  onClose?: () => void;
};

const AddGallery: FC<AddGalleryProps> = ({ open, onClose, addGallery }) => {

  const [disabled, setDisabled] = useState(true);
  const [galleryInput, setGalleryInput] = useState("");

  const handleInput = (event) => {
    setGalleryInput(event.currentTarget.value);
  };

  const handleClose = () => {
    onClose();
    setGalleryInput("");
  };

  const handleCreate = () => {
    if (galleryInput.length > 0) {
      const data = {
        name: galleryInput,
      };
      addGallery(data);
      handleClose()
    }
  };

  return (
    <Modal
      label="New Gallery"
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button
            variant={"create"}
            onClick={handleCreate}
            disabled={galleryInput.length == 0}
          />
        </>
      }
    >
      <InputText placeholder={"Name"} asterisk onChange={handleInput} />
    </Modal>
  );
};

export default AddGallery;
