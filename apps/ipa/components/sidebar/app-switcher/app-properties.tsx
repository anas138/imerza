import { IconCategory, IconSettings, IconTerminal2 } from "@tabler/icons-react";

const AppProperties = {
  collateral: {
    name: "Collateral",
    icon: <IconCategory size={30} strokeWidth={1.6} />,
    defaultPath: "/collateral/generated",
  },
  settings: {
    name: "Settings",
    icon: <IconSettings size={30} strokeWidth={1.6} />,
    defaultPath: "/settings/overview",
  },
  admin: {
    name: "Admin",
    icon: <IconTerminal2 size={30} strokeWidth={1.6} />,
    defaultPath: "/admin/projects",
  },
};

export default AppProperties;
