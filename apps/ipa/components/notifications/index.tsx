import { FC, useEffect, useState } from "react";
import {
  ActionIcon,
  Affix,
  Box,
  Flex,
  Group,
  Loader,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { NotificationsStyle } from "./notifications.style";
import {
  IconChevronUp,
  IconCircleCheck,
  IconMinus,
  IconSquareX,
  IconX,
} from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";

const useStyles = NotificationsStyle;

type NotificationsProps = {
  setNotifications: (toggle: boolean) => void;
  notifications: boolean;
  message: string;
  imageFiles?:[]
};

const Notifications: FC<NotificationsProps> = ({
  notifications,
  setNotifications,
  message,
  imageFiles
}) => {
  const [minimize, setMinimize] = useState(false);
  const [uploading, setUploading] = useState(true);
  const { classes } = useStyles({ minimize });
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();

  let timer: any;
  useEffect(() => {
    timer = setTimeout(() => {
      setNotifications(!notifications);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [notifications]);

  const handleClose = () => {
    setNotifications(!notifications);
  };
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Box className={classes.notificationTray}>
        <Group position={"apart"} className={classes.title}>
          <Flex gap={10}>
            <Loader size={20} color="orange" />
            <Text size={14}>Upload in Progress</Text>
          </Flex>
          <Flex gap={10}>
            <ActionIcon
              size={26}
              className={classes.button}
              onClick={() => setMinimize(!minimize)}
            >
              {minimize ? (
                <IconChevronUp size={20} strokeWidth={1.8} />
              ) : (
                <IconMinus size={20} strokeWidth={1.8} />
              )}
            </ActionIcon>
            <ActionIcon size={26} className={classes.button}>
              <IconX size={20} strokeWidth={1.8} />
            </ActionIcon>
          </Flex>
        </Group>
        {!minimize && (
          <ScrollArea.Autosize maxHeight={350} scrollbarSize={5}>
            {imageFiles && Object.values(imageFiles)?.map((file, i) => (
              <Group position={"apart"} className={classes.item} key={i}>
                <Flex align={"center"} gap={8}>
                  <img src = {`${URL.createObjectURL(file)}`} className={classes.preview}/>
                  <Text size={12}>{file["name"]}</Text>
                </Flex>
                <Box ref={ref} className={classes.status}>
                  {uploading ? (
                    <>
                      {hovered ? (
                        <IconSquareX
                          size={26}
                          color={theme.colors.red[7]}
                          strokeWidth={1.8}
                        />
                      ) : (
                        <Loader size={20} color={"orange"} />
                      )}
                    </>
                  ) : (
                    <>
                      {hovered ? (
                        <IconCircleCheck size={20} color={"lime"} />
                      ) : (
                        <Loader size={20} color={"orange"} />
                      )}
                    </>
                  )}
                </Box>
              </Group>
            ))}
          </ScrollArea.Autosize>
        )}
      </Box>
      {/*<Notification*/}
      {/*  color="teal"*/}
      {/*  icon={<CheckIcon />}*/}
      {/*  sx={{ background: "#1A1B1E", border: "none" }}*/}
      {/*  onClose={handleClose}*/}
      {/*>*/}
      {/*  <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>*/}
      {/*    {props.message}*/}
      {/*  </span>*/}
      {/*</Notification>*/}
    </Affix>
  );
};

export default Notifications;
