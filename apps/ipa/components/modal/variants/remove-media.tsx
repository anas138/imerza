import { FC, useContext } from "react";
import Modal from "../index";
import Button from "../../common/button";
import { Text } from "@mantine/core";
import { UserContext } from "../../../context/contextProvider";
type RemoveMediaProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  currentMedia: {};
  galleryId?: any;
  updateImages:()=>void
};

const RemoveMedia: FC<RemoveMediaProps> = ({
  open,
  onClose,
  name,
  currentMedia,
  galleryId,
  updateImages
}) => {
  const { putContext } = useContext(UserContext);
  const handleClose = () => {
    onClose();
  };

  const handleRemove = async () => {
    console.log(currentMedia, "current");
    console.log(galleryId,"gggg")
    const payload = {
      id: galleryId,
      imageId: currentMedia["_id"],
    };
    const response = await putContext("collateral/image",payload)
    if(response){
      updateImages()
      handleClose()
    }
  };

  return (
    <Modal
      label={`Remove Media`}
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
      <Text color={"dimmed"}>
        Are you sure you wish to remove{" "}
        <Text span fs="italic" mr={2}>
          {name}
        </Text>
        ?
      </Text>
    </Modal>
  );
};

export default RemoveMedia;
