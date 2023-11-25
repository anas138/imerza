import Link from 'next/link';
import AppProperties from './app-properties';
import { Center, Space, Text, UnstyledButton } from '@mantine/core';
import { AppSwitcherStyle } from './app-switcher.style';

const useStyles = AppSwitcherStyle;

const App = ({ app, currentApp }) => {
const { classes } = useStyles({ activeTray: null, activeApp: currentApp.includes(app) });

  return (
    <Link href={AppProperties[app].defaultPath}>
      <UnstyledButton className={classes.app} disabled={currentApp.includes(app)}>
        <Center>
          <div className={classes.appIcon}>
            {AppProperties[app].icon}
          </div>
        </Center>
        <Space h={2} />
        <Center>
          <Text size={8} transform={'uppercase'} className={classes.appText}>
            {AppProperties[app].name}
          </Text>
        </Center>
      </UnstyledButton>
    </Link>
  );
};
export default App;
