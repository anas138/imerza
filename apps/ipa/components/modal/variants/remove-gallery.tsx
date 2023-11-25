import { FC,useContext } from "react";
import Modal from "../index";
import Button from "../../common/button";
import { Text } from "@mantine/core";
import { UserContext } from "../../../context/contextProvider";


type RemoveGalleryProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  currentGallery?:{
    _id:string
  }
};

const RemoveGallery: FC<RemoveGalleryProps> = ({ open, onClose, name,currentGallery }) => {
  const {delContext} = useContext(UserContext)
  const handleClose = () => {
    onClose();
  };

  const handleRemove = async() => {
    console.log(currentGallery._id,"id")
    const response = await delContext(`collateral/${currentGallery?._id}`)
    if(response){
      handleClose()
    }
  };
   
  return (
    <Modal
      label={`Remove Gallery`}
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
      <Text color={"dimmed"}>Are you sure you wish to remove <Text span fs="italic" mr={2}>{name}</Text>?</Text>
    </Modal>
  );
};

export default RemoveGallery;
