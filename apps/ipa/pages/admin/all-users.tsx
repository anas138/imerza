import { useState, useEffect } from "react";
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
import { getRequest } from "../../context/apis";
import AdminProtectedRoute from "../../components/hoc/AdminProtectedRoute";

const AllUsers = () => {
  /* Start of Variable Declarations */
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [openAddClient, setOpenAddClient] = useState(false);
  const [openRemoveUser, setOpenRemoveUser] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState(null);
  const [projects, setProjects] = useState(null);
  /* End of Variable Declarations */
  useEffect(() => {
    getUsers();
    getProjects();
  }, []);
  /* Start of Handlers */
  const handleRemoveUser = (id) => {
    setOpenRemoveUser(true);
    setCurrentUser(id);
    console.log(`Ready to Remove User ID ${id}`);
  };

  const getProjects = async () => {
    const { data } = await getRequest("auth/getProjects");
    setProjects(data?.map((d) => ({ value: d.project_root, label: d.name })));
    //setProjects(data)
  };
  /* End of Handlers */
  const getUsers = async () => {
    const { data } = await getRequest("auth/users");
    setUsers(data);
  };
  return (
    <>
      <Header name={"All Users"} />
      <Flex direction={"column"} gap={25}>
        <UsersContainer label={"Admin"}>
          <TileGrid>
            {users
              ?.filter((f) => f.role === "Admin")
              .map((user, i) => (
                <UserTile
                  id={i}
                  name={user.name}
                  options={[
                    ["removeUser", () => handleRemoveUser("Admin " + i)],
                  ]}
                  internal
                  key={i}
                />
              ))}
            <ActionTile
              buttons={[
                <ActionButton
                  vertical
                  label={<Text size={15}>Add User</Text>}
                  icon={<IconPlus size={36} strokeWidth={1.4} />}
                  onClick={() => setOpenAddAdmin(true)}
                />,
              ]}
            />
          </TileGrid>
        </UsersContainer>
        <UsersContainer label={"Client"}>
          <TileGrid>
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
            {users
              ?.filter((f) => f.role === "Client")
              .map((user, i) => (
                <UserTile
                  id={i}
                  name={user.name}
                  label={"Connect Project Name"}
                  options={[
                    ["removeUser", () => handleRemoveUser("Client " + i)],
                  ]}
                  key={i}
                />
              ))}
          </TileGrid>
        </UsersContainer>
      </Flex>
      <AddUser
        open={openAddAdmin}
        onClose={() => {
          getUsers();
          setOpenAddAdmin(false);
        }}
        role={"Admin"}
      />
      <AddUser
        open={openAddClient}
        onClose={() => {
          getUsers();
          setOpenAddClient(false);
        }}
        role={"Client"}
        projectSelect
        userProjects={projects}
      />
      <RemoveUser
        open={openRemoveUser}
        onClose={() => {
          getUsers();
          setOpenRemoveUser(false);
        }}
        username={"Connect Name"}
        id={currentUser}
      />
    </>
  );
};

export default AdminProtectedRoute(AllUsers);
