/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { closeModal, openModal } from "@mantine/modals";
import { Button, Group, Space, TextInput } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useState } from "react";

type PromptModalProps = {
  modalId?: string;
  title: string;
  labels?: {
    save?: string;
    cancel?: string;
  };
  validate?: (
    value: string
  ) => boolean | string | PromiseLike<boolean | string>;
  defaultValue?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
};

export const openPromptModal = ({
  modalId: _modalId,
  labels: _labels = {},
  title,
  validate,
  defaultValue = "",
  onSave,
  onCancel,
}: PromptModalProps) => {
  const modalId = _modalId ?? randomId();
  const labels = { save: "Save", cancel: "Cancel", ..._labels };

  openModal({
    modalId: modalId,
    title: title,
    centered: true,
    children: (
      <PromptModal
        modalId={modalId}
        labels={labels}
        validate={validate}
        defaultValue={defaultValue}
        onSubmit={onSave}
      />
    ),
    onClose() {
      onCancel();
    },
  });
};

const PromptModal = ({ onSubmit, defaultValue, modalId, labels, validate }) => {
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name") as string;
    Promise.resolve(false)
      .then(() => validate(name))
      .then((valid) => {
        if (valid === true) {
          closeModal(modalId);
          onSubmit(name);
        } else {
          setError(valid);
        }
      });
  };

  return (
    <form onSubmit={submit}>
      <TextInput
        variant={"filled"}
        name={"name"}
        label="Name"
        defaultValue={defaultValue}
        placeholder="Name"
        error={error}
        onChange={(e) => setError("")}
      />
      <Space h={"xl"} />
      <Group position={"right"}>
        <Button
          variant="default"
          color="dark"
          onClick={() => closeModal(modalId)}
        >
          {labels.cancel}
        </Button>
        <Button variant="filled" color="red" type={"submit"}>
          {labels.save}
        </Button>
      </Group>
    </form>
  );
};
