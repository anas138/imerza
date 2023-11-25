/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import React, { useState } from 'react';
import Header from '../../components/header';
import Search from '../../components/header/search';
import TileGrid from '../../components/content/grid/tile-grid';
import MediaTile from '../../components/content/tile/variants/media-tile';
import EditMedia from '../../components/modal/variants/edit-media';
import DownloadMedia from '../../components/modal/variants/download-media';
import Share from '../../components/modal/variants/share';
import HOC from '../../components/hoc/Hoc';

type mediaType = {
  _id: string;
  image: string;
};

const Generated = () => {
  const generated = [
    {
      _id: 0,
      name: "Pool Deck",
      data_added: "2023-04-07",
      media: {
        thumbnail:
          "https://srresidenceslongboatkey.com/wp-content/themes/stregisfull2020/images/hp-close-up-aerial-hires-8K-updated-min.jpg", //Image
        small:
          "https://srresidenceslongboatkey.com/wp-content/themes/stregisfull2020/images/hp-close-up-aerial-hires-8K-updated-min.jpg", //Can be Image or Video
        large:
          "https://srresidenceslongboatkey.com/wp-content/themes/stregisfull2020/images/hp-close-up-aerial-hires-8K-updated-min.jpg", //Can be Image or Video
        full: "https://srresidenceslongboatkey.com/wp-content/themes/stregisfull2020/images/hp-close-up-aerial-hires-8K-updated-min.jpg", //Can be Image or Video
      },
      is_video: false,
    },
    {
      _id: 1,
      name: "Balcony",
      data_added: "2023-04-07",
      media: {
        thumbnail:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/st-regis-longboatkey-exterior-balcony-min_rhzn2a.jpg", //Image
        small:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/st-regis-longboatkey-exterior-balcony-min_rhzn2a.jpg", //Image
        large:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/st-regis-longboatkey-exterior-balcony-min_rhzn2a.jpg", //Can be Image or Video
        full: "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/st-regis-longboatkey-exterior-balcony-min_rhzn2a.jpg", //Can be Image or Video
      },
      is_video: false,
    },
    {
      _id: 2,
      name: "Terrace Evening",
      data_added: "2023-04-07",
      media: {
        thumbnail:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/20210329_ROOFTOP_moyk4u.jpg", //Image
        small:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/20210329_ROOFTOP_moyk4u.jpg", //Image
        large:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/20210329_ROOFTOP_moyk4u.jpg", //Can be Image or Video
        full: "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/20210329_ROOFTOP_moyk4u.jpg", //Can be Image or Video
      },
      is_video: false,
    },
    {
      _id: 3,
      name: "Bedroom Evening",
      data_added: "2023-04-07",
      media: {
        thumbnail:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/champagne-plan14-mb-min_nj5xsn.jpg", //Image
        small:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/champagne-plan14-mb-min_nj5xsn.jpg", //Image
        large:
          "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/champagne-plan14-mb-min_nj5xsn.jpg", //Can be Image or Video
        full: "https://res.cloudinary.com/sagacity/image/upload/c_crop/c_limit,dpr_2,f_auto,fl_lossy,q_80,w_656/champagne-plan14-mb-min_nj5xsn.jpg", //Can be Image or Video
      },
      is_video: true,
    },
  ];

  /* Start of Variable Declarations */
  const [openEditMedia, setOpenEditMedia] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  const [currentItem, setCurrentItem] = useState(0);
  const currentMedia = generated?.length > 0 && generated[currentItem];

  const [search, setSearch] = useState("");
  /* End of Variable Declarations */

  /* Start of Data Retrieval */

  //TODO: Pull in generated media

  /* End of Data Retrieval */

  /* Start of Search Handler */
  const handleSearch = (e) => {
    setSearch(e.target.value);
    //TODO: Connect search and tag data to filter data map
  };
  /* End of Search Handler */

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
        name={"Generated"}
        rightSection={<Search onChange={handleSearch} />}
      />
      <TileGrid>
        {generated?.length
          ? generated
              ?.filter((media) =>
                media.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((filtered, index) => {
                return (
                  <MediaTile
                    id={filtered._id}
                    variant={"allMedia"}
                    label={filtered.name}
                    url={filtered.media.thumbnail}
                    options={[
                      ["editMedia", () => toggleEditMedia(filtered, index)],
                      ["downloadMedia", () => toggleDownload(filtered, index)],
                      ["copyLink", () => null],
                      // ["shareMedia", () => toggleShare(filtered, index)],
                    ]}
                    key={filtered._id}
                    onClick={() => toggleEditMedia(filtered, index)}
                  />
                );
              })
          : ""}
      </TileGrid>
      <EditMedia
        open={openEditMedia}
        onClose={() => setOpenEditMedia(false)}
        name={currentMedia?.name} //TODO: Connect image name here
        url={currentMedia?.media.large} //TODO: Connect image URL here
        isVideo={currentMedia?.is_video}
        prev={currentItem == 0 ? false : () => setCurrentItem(currentItem - 1)}
        next={
          currentItem == generated?.length - 1
            ? false
            : () => setCurrentItem(currentItem + 1)
        }
      />
      <DownloadMedia
        open={openDownload}
        onClose={() => setOpenDownload(false)}
        url={currentMedia?.media.large}
        isVideo={currentMedia?.is_video}
      />
      <Share
        open={openShare}
        onClose={() => setOpenShare(false)}
        url={currentMedia?.media.large}
      />
    </>
  );
};

export default HOC(Generated);
