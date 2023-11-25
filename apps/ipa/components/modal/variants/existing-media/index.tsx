import { FC, useState } from "react";
import Modal from "../../index";
import Button from "../../../common/button";
import { Text } from "@mantine/core";
import SelectMedia from "./select-media";

type ExistingMediaProps = {
  open: boolean;
  onClose: () => void;
  handleMedia?: () => void;
};

const ExistingMedia: FC<ExistingMediaProps> = ({
  open,
  onClose,
  handleMedia,
}) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [media, setMedia] = useState("");

  const handleClick = (type) => {
    setMedia(type);
    setOpenSelect(true);
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal
        label="Existing Media"
        open={open}
        onClose={handleClose}
        variant={"default"}
        action={
          <>
            <Button variant={"cancel"} onClick={handleClose} />
            <Button
              variant={"allMedia"}
              onClick={() => handleClick("allMedia")}
            />
            <Button
              variant={"generated"}
              onClick={() => handleClick("generated")}
              disabled={true}
            />
          </>
        }
        centerActions
      >
        <Text align={"center"}>
          Please select where to add collateral from:
        </Text>
      </Modal>
      <SelectMedia
        open={openSelect}
        onClose={() => setOpenSelect(false)}
        mediaType={media}
        handleMedia={handleMedia}
      />
    </>
  );
};

export default ExistingMedia;
