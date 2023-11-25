/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import React, { FC, useState } from 'react';
import validateEmail from '../../../lib/validate-email';
import Modal from '../index';
import Button from '../../common/button';
import { Select, Stack } from '@mantine/core';
import getProjectID from '../../../lib/get-project-id';
import { postRequest } from '../../../context/apis';
import InputText from '../../common/input-text';

type AddUserProps = {
  open: boolean;
  onClose: () => void;
  role: string;
  projectSelect?: boolean;
  userProjects?: any;
};

const AddUser: FC<AddUserProps> = ({
  open,
  onClose,
  role,
  projectSelect,
  userProjects,
}) => {
  /* Start of Variable Declarations */
  // TODO: Finish GET function for current project ID in lib directory. To be used when already inside project. Admin will be -1?
  const projectID = getProjectID();

  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    project: projectSelect || role.includes("Admin") ? -1 : projectID,
    username: "",
    email: "",
  });
  /* End of Variable Declarations */

  /* Start of Handlers */
  const handleInputs = (value, name) => {
    user[name] = value;
    setUser(user);
    setDisabled(
      user.username.length == 0 ||
        user.email.length == 0 ||
        !validateEmail(user.email) ||
        (projectSelect && user.project == -1)
    );
  };

  const handleCreate = async () => {
    console.log(
      `Creating ${role} user: ${user.username} \t${user.email} Project ${user.project}`
    );
    const payload = {
      name: user.username,
      email: user.email,
      projectId: user.project,
      role: role,
    };
    await postRequest("auth/singnup", payload);
    handleClose();
  };

  const handleClose = () => {
    setDisabled(true);
    setUser({
      project: -1,
      username: "",
      email: "",
    });
    onClose();
  };
  /* End of Handlers */

  return (
    <Modal
      label={`Add ${role}`}
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
        {projectSelect && userProjects && (
          <Select
            label="Project"
            variant={"filled"}
            placeholder="Select Project ID"
            onChange={(id) => {
              handleInputs(id, "project");
            }}
            searchable
            nothingFound="No Projects Found"
            maxDropdownHeight={280}
            required
            data={[...userProjects]}
          />
        )}

        <InputText
          label={"Username"}
          placeholder={"Name"}
          asterisk
          onChange={(e) => {
            handleInputs(e.target.value, "username");
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

export default AddUser;
