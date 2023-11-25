/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import React, { FC, useState } from 'react';
import validateEmail from '../../../lib/validate-email';
import Modal from '../index';
import Button from '../../common/button';
import { Stack } from '@mantine/core';
import InputText from '../../common/input-text';

type AddAgentEmailProps = {
  open: boolean;
  onClose: () => void;
};

const AddAgentEmail: FC<AddAgentEmailProps> = ({ open, onClose }) => {
  /* Start of Variable Declarations */
  const [disabled, setDisabled] = useState(true);
  const [agent, setAgent] = useState({
    name: "",
    email: "",
  });
  /* End of Variable Declarations */

  /* Start of Handlers */
  const handleInputs = (value, field) => {
    agent[field] = value;
    setAgent(agent);
    setDisabled(
      agent.name.length == 0 ||
        agent.email.length == 0 ||
        !validateEmail(agent.email)
    );
  };

  const handleCreate = () => {
    console.log(`Creating ${agent.name}: ${agent.email}`);
    handleClose();
  };

  const handleClose = () => {
    setDisabled(true);
    setAgent({
      name: "",
      email: "",
    });
    onClose();
  };
  /* End of Handlers */

  return (
    <Modal
      label={`Add Agent Email`}
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
          label={"Name"}
          placeholder={"Agent"}
          asterisk
          onChange={(e) => {
            handleInputs(e.target.value, "name");
          }}
        />
        <InputText
          label={"Email"}
          placeholder={"recipient@email.com"}
          asterisk
          onChange={(e) => {
            handleInputs(e.target.value, "email");
          }}
        />
      </Stack>
    </Modal>
  );
};

export default AddAgentEmail;
