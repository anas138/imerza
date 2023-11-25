import { FC, useState } from "react";
import Modal from "../index";
import Button from "../../common/button";
import { Center, SegmentedControl, Text } from "@mantine/core";
import { saveAs } from "file-saver";
type DownloadMediaProps = {
  open: boolean;
  onClose: () => void;
  url: string;
  isVideo?: boolean;
};

const DownloadMedia: FC<DownloadMediaProps> = ({
  open,
  onClose,
  url,
  isVideo,
}) => {
  const [size, setSize] = useState("large");

  const handleClose = () => {
    onClose();
  };
  const downloadMedia = (fileType: string) => {
    saveAs(
      url[0]["actual"],
      `${
        url[0]["actual"].split("/")[url[0]["actual"].split("/").length - 1]
      }.${fileType}`
    );
  };
  return (
    <Modal
      label="Media Type"
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          {isVideo ? (
            <Button
              variant={"mp4"}
              onClick={() => console.log(`Downloading ${url} as MP4`)}
            />
          ) : (
            <>
              <Button
                variant={"jpg"}
                onClick={() => {
                  downloadMedia("jpg");
                }}
              />
              <Button variant={"png"} onClick={() => downloadMedia("png")} />
            </>
          )}
        </>
      }
      centerActions
    >
      <>
        <Text align={"center"} color={"dimmed"}>
          {isVideo
            ? "Please select type to begin download:"
            : "Please select media size and type to begin download:"}
        </Text>
        {!isVideo && (
          <Center pt={"sm"} pb={3}>
            <SegmentedControl
              value={size}
              onChange={setSize}
              data={[
                { label: "Thumbnail", value: "thumbnail" },
                { label: "Small", value: "small" },
                { label: "Large", value: "large" },
                { label: "Full", value: "full" },
              ]}
            />
          </Center>
        )}
      </>
    </Modal>
  );
};

export default DownloadMedia;
