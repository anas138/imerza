/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import {
  IconArrowNarrowLeft,
  IconAugmentedReality,
  IconCheck,
  IconDeviceFloppy,
  IconDownload,
  IconLink,
  IconLogin,
  IconMovie,
  IconPencil,
  IconPlus,
  IconSend,
  IconShare,
  IconTag,
  IconX,
} from '@tabler/icons-react';

const size = 24;
const strokeWidth = 1.4;

const ButtonProperties = {
  confirm: {
    label: "Confirm",
    icon: <IconCheck size={size} strokeWidth={strokeWidth} />,
    color: "#8BFB1B",
  },
  cancel: {
    label: "Cancel",
    icon: <IconX size={size} strokeWidth={strokeWidth} />,
    color: "#FA5252",
  },
  create: {
    label: "Create",
    icon: <IconCheck size={size} strokeWidth={strokeWidth} />,
    color: "#7FE31B",
  },
  png: {
    label: "PNG Format",
    icon: <IconDownload size={size} strokeWidth={strokeWidth} />,
    color: "#FFA94D",
  },
  jpg: {
    label: "JPG Format",
    icon: <IconDownload size={size} strokeWidth={strokeWidth} />,
    color: "#FFA94D",
  },
  mp4: {
    label: "MP4 Format",
    icon: <IconDownload size={size} strokeWidth={strokeWidth} />,
    color: "#FFA94D",
  },
  download: {
    label: "Download",
    icon: <IconDownload size={size} strokeWidth={strokeWidth} />,
  },
  share: {
    label: "Share",
    icon: <IconShare size={size} strokeWidth={strokeWidth} />,
  },
  send: {
    label: "Send",
    icon: <IconSend size={size} strokeWidth={strokeWidth} />,
    color: "#7FE31B",
    type: "submit",
  },
  tagMedia: {
    label: "Tag",
    icon: <IconTag size={size} strokeWidth={strokeWidth} />,
  },
  copyLink: {
    label: "Copy Link",
    icon: <IconLink size={size} strokeWidth={strokeWidth} />,
  },
  close: {
    label: "Close",
    icon: <IconX size={size} strokeWidth={strokeWidth} />,
    color: "#FA5252",
  },
  allMedia: {
    label: "All Media",
    icon: <IconMovie size={size} strokeWidth={strokeWidth} />,
  },
  generated: {
    label: "Generated",
    icon: <IconAugmentedReality size={size} strokeWidth={strokeWidth} />,
  },
  add: {
    label: "Add",
    icon: <IconCheck size={size} strokeWidth={strokeWidth} />,
    color: "#7FE31B",
  },
  back: {
    label: "Go Back",
    icon: <IconArrowNarrowLeft size={size} strokeWidth={strokeWidth} />,
  },
  signIn: {
    label: "Sign In",
    icon: <IconLogin size={size} strokeWidth={strokeWidth} />,
  },
  signUp: {
    label: "Finish",
    icon: <IconCheck size={size} strokeWidth={strokeWidth} />,
  },
  edit: {
    label: "Edit",
    icon: <IconPencil size={size} strokeWidth={strokeWidth} />,
  },
  remove: {
    label: "Remove",
    icon: <IconX size={size} strokeWidth={strokeWidth} />,
    color: "#FA5252",
  },
  save: {
    label: "Save",
    icon: <IconDeviceFloppy size={size} strokeWidth={strokeWidth} />,
    color: "#FFA94D",
  },
  addData: {
    label: "Add",
    icon: <IconPlus size={size} strokeWidth={strokeWidth} />,
  },
};

export default ButtonProperties;
