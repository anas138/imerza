/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { FC, useState, useContext } from "react";
import getPage from "../../../lib/get-page";
import { Divider, Navbar, ScrollArea, Space } from "@mantine/core";
import PageLink from "./page-link";
import GalleryLink from "./gallery-link";
import { ContentStyle } from "./content.style";
import AddGallery from "../../modal/variants/add-gallery";
import { IconPlus } from "@tabler/icons-react";
import { UserContext } from "../../../context/contextProvider";
import { useSession } from "next-auth/react";
import HOC from "../../hoc/Hoc";

const useStyles = ContentStyle;

type SidebarContentProps = {
  decode:{
    id:string,
    projectId:string
  }
};

const SidebarContent: FC<SidebarContentProps> = ({decode}) => {
  const { galleries,setGalleries,postContext,getContext} = useContext(UserContext);
  const { classes } = useStyles({ active: null });
  const session = useSession()
  let currentApp = getPage();

  const [openAddGallery, setOpenAddGallery] = useState(false);
  /* Start of Add Gallery Handler */
  const toggleAddGallery = async (data: object) => {
    null;
  };
  const getGalleries = async () => {
    const response = await getContext(
      `collateral/galleries/${decode.projectId}`
    );
    if (response) {
      setGalleries(response.data);
    }
  };
  const addGallery=async (data:any)=>{
    const gallery = {
      name: data.name,
      user: decode.id,
      project:decode.projectId
    };
     const response = await postContext("collateral/galleries",gallery)
     if(response)
     await getGalleries()
  }
  /* End of Add Gallery Handler */
  switch (true) {
    case currentApp[0].includes("collateral"):
      return (
        <>
          <Navbar.Section>
            <PageLink page={"generated"} />
            <Divider className={classes.pageLinkDivider} />
            <PageLink page={"allMedia"} />
            <Space h={2} />
            <PageLink
              page={"galleries"}
              secondaryAction={() => setOpenAddGallery(true)}
            />
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea}>
            {galleries?.map((gallery, i) => (
              <div key={i}>
                <GalleryLink
                  href={gallery._id.toString()}
                  name={gallery.name}
                  key={i}
                  length={gallery.images.length}
                  id={i.toString()}
                />
                <Divider className={classes.galleryLinkDivider} />
              </div>
            ))}
          </Navbar.Section>
          <AddGallery
            open={openAddGallery}
            onClose={() => setOpenAddGallery(false)}
            addGallery={(data)=>{addGallery(data)}}
          />
        </>
      );
    case currentApp[0].includes("settings"):
      return (
        <Navbar.Section grow>
          <PageLink page={"general"} />
          <Space h={2} />
          <PageLink page={"users"} />
        </Navbar.Section>
      );
    case currentApp[0].includes("admin"):
      return (
        <Navbar.Section grow>
          <PageLink page={"projects"} />
          <Space h={2} />
          <PageLink page={"allUsers"} />
        </Navbar.Section>
      );
  }
};

export default HOC(SidebarContent);
