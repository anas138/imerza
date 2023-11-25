import { Box, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import AppProperties from "./app-properties";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { AppSwitcherStyle } from "./app-switcher.style";
import { forwardRef } from "react";
import { useHover } from "@mantine/hooks";
import getPage from "../../../lib/get-page";

const useStyles = AppSwitcherStyle;

type ToggleProps = {
  openTray: boolean;
  onClick: () => void;
};

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ openTray, onClick }: ToggleProps, menuPosRef) => {
    let currentApp = getPage();
    let appCount = Object.keys(AppProperties).length;
    let disableSwitcher = currentApp[0] == "admin" || appCount <= 1;

    const { classes } = useStyles({ activeTray: openTray, activeApp: null });
    const { hovered, ref } = useHover();

    return (
      <Box ref={ref}>
        <UnstyledButton
          ref={menuPosRef}
          className={classes.toggle}
          onClick={onClick}
          disabled={disableSwitcher}
        >
          <Group position={"apart"}>
            <Group>
              <ThemeIcon color={"red.7"} size={42} radius={"md"}>
                {AppProperties[currentApp[0]]?.icon}
              </ThemeIcon>
              <Text
                size={16}
                transform={"uppercase"}
                className={classes.toggleText}
              >
                {AppProperties[currentApp[0]]?.name}
              </Text>
            </Group>
            {hovered && !openTray && !disableSwitcher && (
              <IconChevronRight className={classes.toggleText} />
            )}
            {openTray && !disableSwitcher && (
              <IconChevronLeft className={classes.toggleText} />
            )}
          </Group>
        </UnstyledButton>
      </Box>
    );
  }
);
export default Toggle;
