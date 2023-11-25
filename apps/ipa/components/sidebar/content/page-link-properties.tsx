import {
  IconAdjustmentsHorizontal,
  IconAugmentedReality,
  IconBuildingSkyscraper,
  IconFolder,
  IconMovie,
  IconPlus,
  IconUsers,
} from "@tabler/icons-react";

const PageLinkProperties = {
  //Collateral
  generated: {
    label: "Generated",
    icon: <IconAugmentedReality size={30} strokeWidth={1.6} />,
    path: "/collateral/generated",
  },
  allMedia: {
    label: "All Media",
    icon: <IconMovie size={30} strokeWidth={1.6} />,
    path: "/collateral/all-media",
  },
  galleries: {
    label: "Galleries",
    icon: <IconFolder size={30} strokeWidth={1.6} />,
    path: "/collateral/galleries",
    secondaryIcon: <IconPlus size={20} />,
  },

  //Settings
  general: {
    label: "Overview",
    icon: <IconAdjustmentsHorizontal size={30} strokeWidth={1.6} />,
    path: "/settings/overview",
  },
  users: {
    label: "Users",
    icon: <IconUsers size={30} strokeWidth={1.6} />,
    path: "/settings/users",
  },

  // Admin
  projects: {
    label: "Projects",
    icon: <IconBuildingSkyscraper size={30} strokeWidth={1.6} />,
    path: "/admin/projects",
  },
  allUsers: {
    label: "All Users",
    icon: <IconUsers size={30} strokeWidth={1.6} />,
    path: "/admin/all-users",
  },
};

export default PageLinkProperties;
