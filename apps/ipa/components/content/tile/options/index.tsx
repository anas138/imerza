/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC } from "react";
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import OptionProperties from "./option-properties";
import { OptionsStyle } from "./options.style";

const useStyles = OptionsStyle;

type OptionsProps = {
  // actions: string[];
  actions?: [string, (any) => any][];
  location: string;
};

const Options: FC<OptionsProps> = ({ actions, location }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles({ location });

  return (
    <>
      {actions?.length > 0 && (
        <Menu
          width={180}
          position={"bottom-start"}
          disabled={actions?.length == 0}
        >
          <Menu.Target>
            <ActionIcon
              variant={"filled"}
              size={"lg"}
              className={classes.menuTarget}
            >
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown className={classes.menuDropdown}>
            {actions?.map((action) => (
              <Menu.Item
                icon={OptionProperties[action[0]]?.icon}
                // onClick={OptionProperties[action].action}
                onClick={action[1]}
                style={{
                  color: OptionProperties[action[0]]?.altTextColor
                    ? (OptionProperties[action[0]]?.altTextColor)
                    : (theme.colorScheme === "dark" ? theme.white : theme.colors.dark[4]),
                }}
                key={OptionProperties[action[0]]?.label}
              >
                {OptionProperties[action[0]]?.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
};
export default Options;
