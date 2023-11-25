import { FC, useContext, useEffect, useState } from "react";
import { useListState } from "@mantine/hooks";
import Modal from "../../index";
import Button from "../../../common/button";
import { Box, SimpleGrid } from "@mantine/core";
import Thumbnail from "../../../content/tile/variants/media-tile";
import { UserContext } from "../../../../context/contextProvider";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import jwtDecode from "jwt-decode";

type SelectGeneratedProps = {
  open: boolean;
  onClose: () => void;
  mediaType: string;
  handleMedia?: () => void;
};

const SelectMedia: FC<SelectGeneratedProps> = ({
  open,
  onClose,
  mediaType,
  handleMedia,
}) => {
  const router = useRouter();
  const { media, setMedia, getContext, postContext } = useContext(UserContext);
  const [galleries, setGalleries] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    getAllMedia();
  }, []);

  const getAllMedia = async () => {
    const decodeToken = jwtDecode(session.user["access_token"]);
    const response = await getContext(
      `collateral/allmedia/${decodeToken["projectId"]}`
    );
    if (response) {
      setMedia(response.data);
    }
  };

  const [selected, handlers] = useListState([]);

  const handleSelect = (id, selected) => {
    if (selected) {
      handlers.append(id);
    } else {
      handlers.filter((_id) => _id != id);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleAdd = async () => {
    //TODO: Connect selected to add media
    console.log(`Adding media ${selected} to galleryID from ${mediaType}`);
    await add();
    handleMedia();
    onClose();
    handlers.setState([]);
    setGalleries([]);
  };
  const addExistingMedia = (url: string, id: string) => {
    const media = {
      image: url,
      galleryId: router?.query?.galleryImages,
      id: id,
    };
    const temp = [...galleries, media];
    setGalleries(temp);
  };

  const add = async () => {
    const response = await postContext("collateral/allmedia/media", galleries);
    if (response) {
    }
  };
  return (
    <Modal
      label={`Select Existing Media:`}
      open={open}
      onClose={handleClose}
      variant={"existing-media"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button
            variant={"add"}
            onClick={handleAdd}
            disabled={selected.length == 0}
          />
        </>
      }
      centerActions
    >
      <Box style={{ padding: 16 }}>
        <SimpleGrid
          breakpoints={[
            { minWidth: 400, cols: 2 },
            { minWidth: 800, cols: 3 },
            { minWidth: 1200, cols: 4 },
            { minWidth: 1600, cols: 5 },
            { minWidth: 1800, cols: 6 },
          ]}
        >
          {media?.map((med, i) => (
            <Thumbnail
              id={med._id}
              variant={"existingMedia"}
              selected={selected.includes(i)}
              onSelect={(selected) => handleSelect(i, selected)}
              url={med.image[0]["actual"]}
              key={i}
              selectImage={(url: string, id: string) => {
                addExistingMedia(url, id);
              }}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Modal>
  );
};

export default SelectMedia;
