import {
  IconDownload,
  IconLink,
  IconPencil,
  IconShare,
  IconTrash,
  IconUserX,
  IconX,
} from "@tabler/icons-react";

const size = 20;
const strokeWidth = 1.6;

const OptionProperties = {
  editMedia: {
    label: "Edit Media",
    icon: <IconPencil size={size} strokeWidth={strokeWidth} />,
    // action: () => console.log("Edit Media"),
  },
  downloadMedia: {
    label: "Download Media",
    icon: <IconDownload size={size} strokeWidth={strokeWidth} />,
    // action: () => console.log("Download Media"),
  },
  shareMedia: {
    label: "Share Media",
    icon: <IconShare size={size} strokeWidth={strokeWidth} />,
    // action: () => console.log("Download Media"),
  },
  copyLink: {
    label: "Copy Link",
    icon: <IconLink size={size} strokeWidth={strokeWidth} />,
  },
  removeMedia: {
    label: "Remove Media",
    icon: <IconX size={size} strokeWidth={strokeWidth} />,
    altTextColor: "#FA5252",
    // action: () => console.log("Download Media"),
  },
  editGallery: {
    label: "Edit Gallery",
    icon: <IconPencil size={size} strokeWidth={strokeWidth} />,
    // action: () => console.log("Edit Gallery"),
  },
  downloadGallery: {
    label: "Download Gallery",
    icon: <IconDownload size={size} strokeWidth={strokeWidth} />,
    // action: () => console.log("Download Gallery"),
  },
  deleteGallery: {
    label: "Delete Gallery",
    icon: <IconTrash size={size} strokeWidth={strokeWidth} />,
    altTextColor: "#FA5252",
    // action: () => console.log("Delete Gallery"),
  },
  editProject: {
    label: "Edit Project",
    icon: <IconPencil size={size} strokeWidth={strokeWidth} />,
    // action: () => console.log("Delete Gallery"),
  },
  removeUser: {
    label: "Remove User",
    icon: <IconUserX size={size} strokeWidth={strokeWidth} />,
    altTextColor: "#FA5252",
  },
};

export default OptionProperties;
