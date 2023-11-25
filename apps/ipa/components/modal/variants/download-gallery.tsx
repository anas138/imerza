import { FC, useState } from "react";
import Modal from "../index";
import Button from "../../common/button";
import { Text } from "@mantine/core";

type DownloadGalleryProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  url: string;
};

const DownloadGallery: FC<DownloadGalleryProps> = ({ open, onClose, name, url }) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      label="Download Gallery"
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button
            variant={"confirm"}
            onClick={() => console.log(`Downloading all content`)}
          />
        </>
      }
    >
      <Text color={"dimmed"}>
        Are you sure you wish to download all contents of <Text span fs="italic" mr={2}>{name}</Text>?
      </Text>
    </Modal>
  );
};

export default DownloadGallery;
