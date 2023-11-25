/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/contextProvider";
import Header from "../../components/header";
import Search from "../../components/header/search";
import TileGrid from "../../components/content/grid/tile-grid";
import ActionTile from "../../components/content/tile/variants/action-tile";
import ActionButton from "../../components/content/tile/variants/action-tile/action-button";
import { Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import MediaTile from "../../components/content/tile/variants/media-tile";
import Upload from "../../components/modal/variants/upload";
import EditMedia from "../../components/modal/variants/edit-media";
import DownloadMedia from "../../components/modal/variants/download-media";
import Share from "../../components/modal/variants/share";
import Notifications from "../../components/notifications";
import HOC from "../../components/hoc/Hoc";
type mediaType = {
  _id: string;
  image: string;
};

const AllMedia = ({ decode }) => {
  const {
    getContext,
    uploadFilesContext,
    loading,
    setMedia,
    media,
    notifications,
    setNotifications,
  } = useContext(UserContext);

  /* Start of Variable Declarations */
  const [openUpload, setOpenUpload] = useState(false);
  const [openEditMedia, setOpenEditMedia] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const currentMedia = media?.length > 0 && media[currentItem];
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [imageFiles,setImageFiles] = useState(null)
  /* End of Variable Declarations */

  /* Start of Data Retrieval */
  useEffect(() => {
    getAllMedia();
  }, []);

  const getAllMedia = async () => {
    const response = await getContext(
      `collateral/allmedia/${decode?.projectId}`
    );
    if (response) {
      setMedia(response.data);
    }
  };
  /* End of Data Retrieval */

  /* Start of Search Handler */
  const handleSearch = (e) => {
    setSearch(e.target.value);
    //TODO: Connect search and tag data to filter data map
  };
  /* End of Search Handler */

  /* Start of Upload Handler */
  const handleUpload = async (data: any) => {
    setImageFiles(data)
    setNotifications(true)
    const files = Object.values(data);
    for (let i in files) {
      const formData = new FormData();
      formData.append("image", data[i]);
      formData.append("projectRoot", decode.projectId);
      formData.append("user", decode.id);
      const response = await uploadFilesContext(
        "collateral/allmedia",
        formData
      );
      if (response) {
        setMessage(response?.data?.message);
        getAllMedia();
        setOpenUpload(false);
      }
    }
    setNotifications(false)
  };
  /* End of Upload Handler */

  /* Start of Tile Option Handlers */
  const toggleEditMedia = (media, index) => {
    setCurrentItem(index);
    setOpenEditMedia(true);
  };

  const toggleDownload = (media, index) => {
    setCurrentItem(index);
    setOpenDownload(true);
  };

  const toggleShare = (media, index) => {
    setCurrentItem(index);
    setOpenShare(true);
  };
  /* End of Tile Option Handlers */
  return (
    <>
      <Header
        name={"All Media"}
        rightSection={<Search onChange={handleSearch} />}
      />
      <TileGrid>
        <ActionTile
          buttons={[
            <ActionButton
              vertical
              label={<Text size={15}>Upload</Text>}
              icon={<IconUpload size={36} strokeWidth={1.4} />}
              onClick={() => setOpenUpload(true)}
            />,
          ]}
        />
        {media?.length
          ? media?.map((img: mediaType, index) => {
              return (
                <MediaTile
                  id={img._id}
                  variant={"allMedia"}
                  label={img["name"]}
                  options={[
                    ["editMedia", () => toggleEditMedia(img, index)],
                    ["downloadMedia", () => toggleDownload(img, index)],
                    ["shareMedia", () => toggleShare(img, index)],
                  ]}
                  url={img.image[0]["actual"]}
                  key={img._id}
                  onClick={() => toggleEditMedia(img, index)}
                />
              );
            })
          : ""}
      </TileGrid>
      <Upload
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        uploadMedia={handleUpload}
      />
      <EditMedia
        open={openEditMedia}
        onClose={() => setOpenEditMedia(false)}
        name={currentMedia?.name} //TODO: Connect image name here
        url={currentMedia?.image && currentMedia?.image} //TODO: Connect image URL here
        prev={currentItem == 0 ? false : () => setCurrentItem(currentItem - 1)}
        next={
          currentItem == media?.length - 1
            ? false
            : () => setCurrentItem(currentItem + 1)
        }
        currentMedia={currentMedia}
        updateImages={getAllMedia}
      />
      <DownloadMedia
        open={openDownload}
        onClose={() => setOpenDownload(false)}
        url={currentMedia?.image}
      />
      <Share
        open={openShare}
        onClose={() => setOpenShare(false)}
        url={currentMedia?.image}
      />
      {notifications && (
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
          message={message}
          imageFiles={imageFiles}
        />
      )}
    </>
  );
};

export default HOC(AllMedia);
