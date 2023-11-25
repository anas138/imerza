import { FC } from "react";
import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import Modal from "../../index";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconMovie, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { UploadStyle } from "./upload.style";

const useStyles = UploadStyle;

type UploadProps = {
  open?: boolean;
  onClose?: () => void;
  uploadMedia: (e: Object) => void;
  props?: Partial<DropzoneProps>;
};

const Upload: FC<UploadProps> = ({ open, onClose, uploadMedia, props }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const handleDrop = (files: Array<File>) => {
    let fileObj = {};
    for (let i = 0; i < files.length; i++) {
      fileObj[i] = files[i];
    }
    uploadMedia(fileObj);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant={"fullscreen"}
      // action={<Button variant={"cancel"} onClick={onClose} />}
    >
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => console.log("rejected files", files)}
        accept={IMAGE_MIME_TYPE}
        className={classes.dropzone}
        {...props}
      >
        <Dropzone.Accept>
          <Stack align={"center"}>
            <IconUpload size={52} stroke={0.9} color={theme.colors.green[6]} />
            <Text size={28} inline mt={7} weight={200}>
              Drop File
            </Text>
            <Text size={16} inline mt={3} color={"dimmed"}>
              Supported File Types: JPEG · JPG · MP4
            </Text>
          </Stack>
        </Dropzone.Accept>
        <Dropzone.Reject>
          <Stack align={"center"}>
            <IconX size={52} stroke={0.9} color={theme.colors.red[6]} />
            <Text size={28} inline mt={7} weight={200}>
              Incompatible File Type
            </Text>
            <Text size={16} inline mt={3} color={"dimmed"}>
              Supported File Types: JPEG · JPG · MP4
            </Text>
          </Stack>
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Stack align={"center"}>
            <Group spacing={"xl"}>
              <IconPhoto size={52} stroke={0.9} />
              <IconMovie size={52} stroke={0.9} />
            </Group>
            <Text size={28} inline mt={7} weight={200}>
              Drop Files Here or Click to Add
            </Text>
            <Text size={16} inline mt={3} color={"dimmed"}>
              Supported File Types: JPEG · JPG · MP4
            </Text>
          </Stack>
        </Dropzone.Idle>
      </Dropzone>
    </Modal>
  );
};
export default Upload;
