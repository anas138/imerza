import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/contextProvider";
import { useRouter } from "next/router";
import Header from "../../../components/header";
import TileGrid from "../../../components/content/grid/tile-grid";
import MediaTile from "../../../components/content/tile/variants/media-tile";
import ActionTile from "../../../components/content/tile/variants/action-tile";
import ActionButton from "../../../components/content/tile/variants/action-tile/action-button";
import { Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import AddGallery from "../../../components/modal/variants/add-gallery";
import DownloadGallery from "../../../components/modal/variants/download-gallery";
import RemoveGallery from "../../../components/modal/variants/remove-gallery";
import Notifications from "../../../components/notifications";
import HOC from "../../../components/hoc/Hoc";
type galleryType = {
  name: string;
  _id: string;
};

const Galleries = ({ decode }) => {
  const {
    getContext,
    postContext,
    loading,
    notifications,
    setNotifications,
    setGalleries,
    galleries,
  } = useContext(UserContext);

  /* Start of Variable Declarations */
  const router = useRouter();
  const [openDownload, setOpenDownload] = useState(false);
  const [openRemoveGallery, setOpenRemoveGallery] = useState(false);
  const [openAddGallery, setOpenAddGallery] = useState(false);

  const [currentItem, setCurrentItem] = useState(0);
  const currentGallery = galleries?.length > 0 && galleries[currentItem];

  const [message, setMessage] = useState("");
  /* End of Variable Declarations */

  /* Start of Data Retrieval */
  useEffect(() => {
    getGalleries();
  }, []);

  const getGalleries = async () => {
    const response = await getContext(
      `collateral/galleries/${decode.projectId}`
    );
    if (response) {
      setGalleries(response.data);
    }
  };
  /* End of Data Retrieval */

  /* Start of Add Gallery Handler */
  const toggleAddGallery = async (data: any) => {
    const gallery = {
      name: data.name,
      user: decode.id,
      project: decode.projectId,
    };
    const response = await postContext("collateral/galleries", gallery);
    if (response) {
      setMessage(response?.data?.message);
      getGalleries();
      setOpenAddGallery(!openAddGallery);
    }
  };
  /* End of Add Gallery Handler */

  /* Start of Tile Option Handlers */
  const handleEditGallery = (gallery) => {
    router.push(`/collateral/galleries/${gallery._id}`).then((r) => r);
  };

  const toggleDownloadGallery = (gallery, index) => {
    setCurrentItem(index);
    setOpenDownload(true);
  };

  const toggleRemoveGallery = (gallery, index) => {
    setCurrentItem(index);
    setOpenRemoveGallery(true);
  };
  /* End of Tile Option Handlers */

  return (
    <>
      <Header name={"Galleries"} />
      <TileGrid>
        {!!galleries &&
          galleries.map((gallery: galleryType, index) => {
            return (
              <MediaTile
                id={gallery._id}
                variant={"galleries"}
                label={gallery.name}
                options={[
                  ["editGallery", () => handleEditGallery(gallery)],
                  [
                    "downloadGallery",
                    () => toggleDownloadGallery(gallery, index),
                  ],
                  ["deleteGallery", () => toggleRemoveGallery(gallery, index)],
                ]}
                path={`/collateral/galleries/${gallery._id}`}
                key={gallery._id}
              />
            );
          })}
        <ActionTile
          buttons={[
            <ActionButton
              vertical
              label={<Text size={15}>New Gallery</Text>}
              icon={<IconPlus size={36} strokeWidth={1.4} />}
              onClick={() => setOpenAddGallery(true)}
            />,
          ]}
        />
      </TileGrid>
      <AddGallery
        open={openAddGallery}
        onClose={() => setOpenAddGallery(false)}
        addGallery={toggleAddGallery}
      />
      <DownloadGallery
        open={openDownload}
        onClose={() => setOpenDownload(false)}
        name={currentGallery?.name}
        url={currentGallery}
      />
      <RemoveGallery
        open={openRemoveGallery}
        onClose={() => {
          getGalleries();
          setOpenRemoveGallery(false);
        }}
        name={currentGallery?.name}
        currentGallery={currentGallery}
      />
      {notifications && (
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
          message={message}
        />
      )}
    </>
  );
};

export default HOC(Galleries);
