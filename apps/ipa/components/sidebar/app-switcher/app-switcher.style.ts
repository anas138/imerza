/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { createStyles } from '@mantine/core';

export const AppSwitcherStyle = createStyles((theme, {
  activeTray,
  activeApp,
}: { activeTray: boolean, activeApp: boolean }) => ({
  toggle: {
    display: 'block',
    height: 62,
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    color: theme.colors.gray[0],
    '&:disabled': {
      cursor: 'default',
    },
    backgroundColor:
      activeTray ? (
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors.gray[4], 0.2)
          : theme.colors.gray[3]
      ) : (
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.fn.rgba(theme.colors.gray[5], 0.2)
      ),
  },
  toggleText: {
    color:
      theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.gray[7],
  },
  tray: {
    padding: 12,
    borderRadius: 8,
    borderColor: theme.colors.red[7],
    backgroundColor: theme.colors.red[7],
  },
  app: {
    height: 60,
    width: 60,
    margin: 4,
    borderRadius: 5,
    justifyItems: 'center',
    alignItems: 'center',
    cursor:
      activeApp && (
        'default'
      ),
    color: theme.colors.white,
    backgroundColor: activeApp ? theme.fn.rgba(theme.white, 0.34) : theme.fn.rgba(theme.white, 0.23),
    transitionDuration: '200ms',
    outline: 'solid',
    outlineOffset: activeApp ? 2 : -1,
    outlineWidth: activeApp ? 2 : 1,
    outlineColor: activeApp ? theme.fn.rgba(theme.white, 0.55) : theme.fn.rgba(theme.white, 0.1),
    '&:hover': {
      backgroundColor:
        !activeApp && theme.fn.rgba(theme.white, 0.32),
    },
  },
  appIcon: {
    color:
      activeApp ? theme.white : theme.colors.gray[1],
  },
  appText: {
    letterSpacing: 0.4,
    color:
      activeApp ? theme.white : theme.colors.gray[1],
  },
}));
