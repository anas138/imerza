import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../../context/contextProvider";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useRouter } from "next/router";
import { useListState } from "@mantine/hooks";
import Header from "../../../../components/header";
import TileGrid from "../../../../components/content/grid/tile-grid";
import ActionTile from "../../../../components/content/tile/variants/action-tile";
import ActionButton from "../../../../components/content/tile/variants/action-tile/action-button";
import { Text } from "@mantine/core";
import { IconMovie, IconUpload } from "@tabler/icons-react";
import MediaTile from "../../../../components/content/tile/variants/media-tile";
import Upload from "../../../../components/modal/variants/upload";
import EditMedia from "../../../../components/modal/variants/edit-media";
import DownloadMedia from "../../../../components/modal/variants/download-media";
import Share from "../../../../components/modal/variants/share";
import RemoveMedia from "../../../../components/modal/variants/remove-media";
import ExistingMedia from "../../../../components/modal/variants/existing-media";
import Notifications from "../../../../components/notifications";
import HOC from "../../../../components/hoc/Hoc";
type galleryImagesType = {
  createdAt: string;
  galleryId: string;
  image: string;
  updatedAt: string;
  _id: string;
};

const GalleryImages = () => {
  const [galleryMedia, setGalleryMedia] = useState([
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
  ]);

  const {
    getContext,
    loading,
    uploadFilesContext,
    postContext,
    notifications,
    setNotifications,
    putContext,
  } = useContext(UserContext);

  /* Start of Variable Declarations */
  const router = useRouter();

  const [gallery, setGallery] = useState(null);
  // const [galleryImages, setGalleryImages] = useState([]);
  const [state, handlers] = useListState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const currentMedia = state?.length > 0 && state[currentItem];

  const [openUpload, setOpenUpload] = useState(false);
  const [openEditMedia, setOpenEditMedia] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openExistingMedia, setOpenExistingMedia] = useState(false);
  const [message, setMessage] = useState("");
  const triggerSort = useRef(false);
  /* End of Variable Declarations */

  /* Start of Data Retrieval */
  useEffect(() => {
    getMedia();
  }, [router?.query?.galleryImages]);
  useEffect(() => {
    if (triggerSort.current === true) {
      updateSortedGallery();
    }
  }, [state, triggerSort.current]);
  const updateSortedGallery = async () => {
    await postContext("collateral/sort", {
      state: state,
      _id: router?.query?.galleryImages,
    });
    triggerSort.current = false;
  };

  const getMedia = async () => {
    let sorted = [];
    const id = router?.query?.galleryImages;
    if (id) {
      const response = await getContext(`collateral/images/${id}`);
      if (response) {
        setGallery(response.data[0]);
        //setGalleryImages(response.data[0]?.media);
        response.data[0]?.images.forEach((img) => {
          const extract = response.data[0]?.media.find(
            (media) => media._id === img
          );
          sorted.push(extract);
        });
        handlers.setState(sorted);
      }
    }
  };
  /* End of Data Retrieval */

  /* Start of Upload Handler */
  const handleUpload = async (files: Object) => {
    let error = false;
    const data: Array<Object> = Object.values(files);
    const id = router?.query?.galleryImages;
    const formData = new FormData();
    for (let i in data) {
      if (files[i].type === "image/jpeg" || files[i].type === "image/jpg") {
        formData.append("image", files[i]);
      } else {
        error = true;
      }
    }
    if (!error) {
      const response = await uploadFilesContext(
        `collateral/addimage/${id}`,
        formData
      );
      if (response) {
        setMessage(response?.data?.message);
        setOpenUpload(false);
        getMedia();
      }
    }
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

  const toggleRemove = (media, index) => {
    setCurrentItem(index);
    setOpenRemove(true);
  };
  /* End of Tile Option Handlers */

  /* Start of Drag and Drop Kit Logic */
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id._id !== over.id._id) {
      const indexA = state.findIndex((ind) => ind._id === active.id._id);
      const indexB = state.findIndex((ind) => ind._id === over.id._id);
      handlers.reorder({ from: indexA, to: indexB });
    }
    triggerSort.current = true;
    setActiveId(null);
  }
  function handleDragMove(event) {}

  function handleDragCancel() {
    setActiveId(null);
  }
  /* End of DND Kit Logic */
  // TODO: Save gallery order to current state immediately after reorder, currently shows initial state when in edit-media modal
  return (
    <>
      <Header name={gallery?.name} />
      <TileGrid>
        <ActionTile
          buttons={[
            <ActionButton
              label={<Text size={16}>Upload</Text>}
              icon={<IconUpload size={34} strokeWidth={1.4} />}
              onClick={() => setOpenUpload(true)}
            />,
            <ActionButton
              label={<Text size={16}>Existing Media</Text>}
              icon={<IconMovie size={34} strokeWidth={1.4} />}
              onClick={() => setOpenExistingMedia(true)}
            />,
          ]}
        />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragMove={handleDragMove}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={state.map(
              (galleryImages) => galleryImages && galleryImages["_id"]
            )}
            strategy={rectSortingStrategy}
          >
            {state?.map((galleryMedia, index) => (
              <MediaTile
                id={galleryMedia}
                variant={"gallery"}
                label={galleryMedia?.name}
                url={galleryMedia?.image[0]["actual"]}
                options={[
                  ["editMedia", () => toggleEditMedia(galleryMedia, index)],
                  ["downloadMedia", () => toggleDownload(galleryMedia, index)],
                  ["shareMedia", () => toggleShare(galleryMedia, index)],
                  ["removeMedia", () => toggleRemove(galleryMedia, index)],
                ]}
                onClick={() => toggleEditMedia(galleryMedia, index)}
                key={index}
              />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <MediaTile
                id={activeId._id}
                variant={"gallery"}
                label={activeId.name}
                url={activeId?.image[0]["actual"]}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
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
        isVideo={currentMedia?.is_video}
        prev={currentItem == 0 ? false : () => setCurrentItem(currentItem - 1)}
        next={
          currentItem == state?.length - 1
            ? false
            : () => setCurrentItem(currentItem + 1)
        }
        currentMedia={currentMedia}
        updateImages={() => getMedia()}
      />
      <DownloadMedia
        open={openDownload}
        onClose={() => setOpenDownload(false)}
        url={currentMedia?.image && currentMedia?.image}
        isVideo={false}
      />
      <Share
        open={openShare}
        onClose={() => setOpenShare(false)}
        url={currentMedia?.image && currentMedia?.image}
      />
      <RemoveMedia
        open={openRemove}
        onClose={() => setOpenRemove(false)}
        name={currentMedia?.name}
        currentMedia={currentMedia}
        galleryId={router?.query?.galleryImages}
        updateImages={() => getMedia()}
      />
      <ExistingMedia
        open={openExistingMedia}
        onClose={() => setOpenExistingMedia(false)}
        handleMedia={() => {
          getMedia();
        }}
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

export default HOC(GalleryImages);
