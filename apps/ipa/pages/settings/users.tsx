import { useState } from "react";
import Header from "../../components/header";
import UsersContainer from "../../components/content/container/users-container";
import TileGrid from "../../components/content/grid/tile-grid";
import UserTile from "../../components/content/tile/variants/user-tile";
import ActionTile from "../../components/content/tile/variants/action-tile";
import ActionButton from "../../components/content/tile/variants/action-tile/action-button";
import { Flex, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import AddUser from "../../components/modal/variants/add-user";
import RemoveUser from "../../components/modal/variants/remove-user";

const Users = () => {
  /* Start of Variable Declarations */
  const [openAddClient, setOpenAddClient] = useState(false);
  const [openRemoveUser, setOpenRemoveUser] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  /* End of Variable Declarations */

  /* Start of Handlers */
  const handleRemoveUser = (id) => {
    setCurrentUser(id);
    setOpenRemoveUser(true);
  };
  /* End of Handlers */

  return (
    <>
      <Header name={"Users"} />
      <Flex direction={"column"} gap={25}>
        <UsersContainer label={"Client"}>
          <TileGrid>
            {new Array(4).fill(null).map((_, i) => (
              <UserTile
                id={i}
                name={`Sales ${i + 1}`}
                options={[["removeUser", () => handleRemoveUser(i)]]}
                key={i}
              />
            ))}
            <ActionTile
              buttons={[
                <ActionButton
                  vertical
                  label={<Text size={15}>Add User</Text>}
                  icon={<IconPlus size={36} strokeWidth={1.4} />}
                  onClick={() => setOpenAddClient(true)}
                />,
              ]}
            />
          </TileGrid>
        </UsersContainer>
      </Flex>
      <AddUser
        open={openAddClient}
        onClose={() => setOpenAddClient(false)}
        role={"Client"}
      />
      <RemoveUser
        open={openRemoveUser}
        onClose={() => setOpenRemoveUser(false)}
        username={"Connect Name"}
        id={currentUser}
      />
    </>
  );
};

export default Users;
