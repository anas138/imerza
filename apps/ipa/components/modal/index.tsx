import { FC } from "react";
import {
  Box,
  Center,
  Group,
  Modal,
  Space,
  useMantineTheme,
} from "@mantine/core";
import { ModalStyle } from "./modal.style";
import CloseButton from "./close-button";

const useStyles = ModalStyle;

type ModalFrameworkProps = {
  open: boolean;
  onClose: () => void;
  variant: string;
  label?: string;
  header?: JSX.Element;
  action?: JSX.Element;
  centerActions?: boolean;
  children: JSX.Element;
};

const ModalFramework: FC<ModalFrameworkProps> = ({
  open,
  onClose,
  variant,
  label,
  header,
  action,
  centerActions,
  children,
}) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  switch (variant) {
    case "fullscreen":
      /* Case used for Upload and Edit-Media modals */
      return (
        <>
          <Modal
            opened={open}
            size={"100%"}
            onClose={onClose}
            withCloseButton={false}
            closeOnEscape
            overlayBlur={2}
            overlayColor={
              theme.colorScheme === "dark"
                ? theme.fn.rgba(theme.black, 0.6)
                : theme.fn.rgba(theme.black, 0.4)
            }
            transition={"fade"}
            transitionDuration={150}
            styles={{
              inner: {
                padding: 0,
              },
              modal: {
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "none",
                backgroundColor: theme.fn.rgba(theme.white, 0),
              },
              overlay: {
                position: "relative",
              },
            }}
          >
            <>
              {header ? (
                <Box className={classes.header}>
                  <Group position={"apart"}>
                    {header}
                    <CloseButton onClick={onClose} />
                  </Group>
                </Box>
              ) : (
                <Box className={classes.closeButtonContainer}>
                  <CloseButton onClick={onClose} />
                </Box>
              )}
              {children}
              {action && (
                <Center>
                  <Box className={classes.actionContainer}>
                    <Group position={"center"} spacing={"xl"}>
                      {action}
                    </Group>
                  </Box>
                </Center>
              )}
            </>
          </Modal>
        </>
      );
    case "existing-media":
      /* Case used for Existing-Media modal */
      return (
        <Modal
          opened={open}
          onClose={onClose}
          title={label}
          overlayBlur={2}
          withCloseButton={false}
          centered
          size={"70%"}
          overflow="inside"
        >
          <Box style={{ position: "absolute", top: 14, right: 18 }}>
            <Group>{action}</Group>
          </Box>
          {children}
        </Modal>
      );
    default:
      /* Case used for Add-Gallery, Add-User, Download, Remove-User, Rename-Media, Share modals */
      return (
        <Modal
          opened={open}
          onClose={onClose}
          title={label}
          overlayBlur={2}
          centered
          size={500}
        >
          {children}
          <Space h={"md"} />
          <Group position={centerActions ? "center" : "right"}>{action}</Group>
        </Modal>
      );
  }
};
export default ModalFramework;
