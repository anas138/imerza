import { FC } from "react";
import Modal from "../index";
import Button from "../../common/button";
import { Code, ScrollArea, Stack, Text, useMantineTheme } from "@mantine/core";

type SaveSettingsProps = {
  open: boolean;
  onClose: () => void;
  settings: any;
};

const SaveSettings: FC<SaveSettingsProps> = ({ open, onClose, settings }) => {
  const theme = useMantineTheme();

  /* Start of Handlers */
  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onClose();
  };
  /* End of Handlers */

  return (
    <Modal
      label={`Save Settings`}
      open={open}
      onClose={handleClose}
      variant={"default"}
      action={
        <>
          <Button variant={"cancel"} onClick={handleClose} />
          <Button variant={"confirm"} onClick={handleSave} />
        </>
      }
    >
      <Stack spacing={"sm"} mb={4}>
        <Text color={"dimmed"}>
          Are you sure you wish to update the following:
        </Text>
        <Code
          mr={2}
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.fn.rgba(theme.colors.gray[3], 0.5),
          }}
        >
          <ScrollArea.Autosize maxHeight={450}>
            {Object.keys(settings).map((key, i) => (
              <Text size={13} py={3} key={i}>
                <Text span fw={500} transform={"capitalize"}>
                  {key}:
                </Text>
                <Text ml={"xs"} span fw={300}>
                  {JSON.stringify(settings[key])}
                </Text>
              </Text>
            ))}
          </ScrollArea.Autosize>
        </Code>
      </Stack>
    </Modal>
  );
};

export default SaveSettings;
