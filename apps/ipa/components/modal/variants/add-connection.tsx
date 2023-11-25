import React, { FC, useState } from "react";
import Modal from "../index";
import Button from "../../common/button";
import { Stack } from "@mantine/core";
import InputText from "../../common/input-text";

type AddConnectionProps = {
  type: string;
  open: boolean;
  onClose: () => void;
};

const AddConnection: FC<AddConnectionProps> = ({ type, open, onClose }) => {
  /* Start of Variable Declarations */
  const [disabled, setDisabled] = useState(true);
  const [connection, setConnection] = useState({
    label: "",
    data: "",
  });
  /* End of Variable Declarations */

  /* Start of Handlers */
  const handleInputs = (value, field) => {
    connection[field] = value;
    setConnection(connection);
    setDisabled(connection.label.length == 0 || connection.data.length == 0);
  };

  const handleCreate = () => {
    console.log(`Added connection: ${connection.label} \t${connection.data}`);
    handleClose();
  };
  /* End of Handlers */

  const handleClose = () => {
    onClose();
    setDisabled(true);
    setConnection({
      label: "",
      data: "",
    });
  };

  return (
    <Modal
      label={`Add ${type}`}
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button
            variant={"create"}
            onClick={handleCreate}
            disabled={disabled}
          />
        </>
      }
    >
      <Stack spacing={"sm"} mb={4}>
        <InputText
          label={"Label"}
          placeholder={"Name"}
          asterisk
          onChange={(e) => handleInputs(e.target.value, "label")}
        />
        <InputText
          label={"Data"}
          placeholder={"0.0.0.0"}
          asterisk
          onChange={(e) => handleInputs(e.target.value, "data")}
        />
      </Stack>
    </Modal>
  );
};

export default AddConnection;
