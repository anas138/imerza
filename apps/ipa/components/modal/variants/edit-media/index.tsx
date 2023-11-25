/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC, useState } from 'react';
import { EditMediaStyle } from './edit-media.style';
import Modal from '../../index';
import { ActionIcon, Box, Group, Text } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import Button from '../../../common/button';
import IteratorButton from './interator-button';
import RenameMedia from '../rename-media';
import DownloadMedia from '../download-media';
import Share from '../share';
import TagMedia from '../tag-media';

const useStyles = EditMediaStyle;

type EditMediaProps = {
  open?: boolean;
  onClose?: () => void;
  name?: string;
  url?: string;
  isVideo?: boolean;
  prev?: boolean | (() => void);
  next?: boolean | (() => void);
  currentMedia?:{_id:string}
  updateImages?:()=>void
};

const EditMedia: FC<EditMediaProps> = ({
  open,
  onClose,
  name,
  url,
  isVideo,
  prev,
  next,
  currentMedia,
  updateImages
}) => {
  /* Styles */
  const { classes } = useStyles();

  /* Start of Variable Declarations */
  const [openRename, setOpenRename] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openTagMedia, setOpenTagMedia] = useState(false);
  /* End of Variable Declarations */

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        variant={"fullscreen"}
        header={
          <Group spacing={"xs"}>
            <Text size={18} className={classes.label}>
              {name}
            </Text>
            <ActionIcon
              size={"lg"}
              onClick={() => setOpenRename(true)}
              className={classes.editButton}
            >
              <IconPencil strokeWidth={1.4} />
            </ActionIcon>
          </Group>
        }
        action={
          <>
            <Button
              variant={"download"}
              onClick={() => {
                setOpenDownload(true);
              }}
            />
            {/*<Button*/}
            {/*  variant={"share"}*/}
            {/*  onClick={() => {*/}
            {/*    setOpenShare(true);*/}
            {/*  }}*/}
            {/*/>*/}
            <Button variant={"copyLink"} onClick={() => null} />
            <Button
              variant={"tagMedia"}
              onClick={() => {
                setOpenTagMedia(true);
              }}
            />
          </>
        }
      >
        <>
          <IteratorButton previous handleToggle={prev} />
          <Box className={classes.mediaContainer}>
            <img
              alt={`Media ${url}`}
              src={`${url && (url[0]["4k"] || url[0]["actual"])}`}
              className={classes.media}
            />
          </Box>
          <IteratorButton handleToggle={next} />
        </>
      </Modal>
      <RenameMedia
        open={openRename}
        onClose={() => setOpenRename(false)}
        label={name}
        imageId={currentMedia?._id}
        update={updateImages}
      />
      <DownloadMedia
        open={openDownload}
        onClose={() => setOpenDownload(false)}
        url={url}
        isVideo={isVideo}
      />
      <Share open={openShare} onClose={() => setOpenShare(false)} url={url} />
      <TagMedia open={openTagMedia} onClose={() => setOpenTagMedia(false)} />
    </>
  );
};
export default EditMedia;
