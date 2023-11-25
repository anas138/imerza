import { FC, useState,useContext } from "react";
import Modal from "../index";
import Button from "../../common/button";
import { TextInput } from "@mantine/core";
import { UserContext } from "../../../context/contextProvider";

type RenameProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  imageId?:string,
  update?:()=>void
};

const RenameMedia: FC<RenameProps> = ({ open, onClose, label,imageId,update }) => {
  const [name, setName] = useState("");
  const {putContext} = useContext(UserContext)
  const handleInput = (event) => {
    setName(event.currentTarget.value);
  };

  const handleClose = () => {
    onClose();
    setName("");
  };

  const handleSubmit = async() => {
    if (name.length > 0) {
      const data = {
        name: name,
        id:imageId
      };
      const response = await putContext("collateral/allmedia/rename",data)
      if(response){
        update()
        handleClose()
      }
    }
  };

  return (
    <Modal
      label={`Rename Media`}
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button
            variant={"confirm"}
            onClick={handleSubmit}
            disabled={name.length == 0}
          />
        </>
      }
    >
      <InputText
        label={"Email"}
        placeholder={label}
        asterisk
        onChange={handleInput}
      />
    </Modal>
  );
};

export default RenameMedia;
