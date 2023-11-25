/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { openPromptModal } from "../../../lib/modals";

export const onAddGallery = (addGallery) => {
  openPromptModal({
    title: "Add Gallery",
    labels: {
      save: "Add",
      cancel: "Cancel",
    },
    onSave: (name) => {
      addGallery(name)
      console.log("Save");
      // const client = getImerzaClient(session.data.accessToken);
      // client.send(new CreateGallery(name)).then(() => mutate());
    },
    validate:(name)=>{
      console.log(name,"validate")
      if(!name) return false
      return true
    },
    onCancel: () => {
      console.log("Cancel");
    },
  });
};
