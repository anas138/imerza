/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC, useState } from "react";
import Modal from "../index";
import { Center, MultiSelect } from "@mantine/core";
import Button from "../../common/button";

type DownloadMediaProps = {
  open: boolean;
  onClose: () => void;
};

const TagMedia: FC<DownloadMediaProps> = ({ open, onClose }) => {
  //TODO: Read tags associated with current media and populate them in the default for multiselect

  const [data, setData] = useState([
    { value: "connect", label: "Connect" },
    { value: "existing", label: "Existing" },
    { value: "tags", label: "Tags" },
    { value: "exterior", label: "Exterior" },
    { value: "interior", label: "Interior" },
    { value: "floorplan", label: "Floorplan" },
  ]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      label="Tag Media"
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={<Button variant={"close"} onClick={handleClose} />}
      centerActions
    >
      <Center px={"sm"}>
        <MultiSelect
          defaultValue={["connect", "existing", "tags"]}
          data={data}
          placeholder="Tag"
          w={"100%"}
          maxDropdownHeight={250}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setData((current) => [...current, item]);
            return item;
          }}
        />
      </Center>
    </Modal>
  );
};

export default TagMedia;
