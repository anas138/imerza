import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Header from "../../components/header";
import TileGrid from "../../components/content/grid/tile-grid";
import ProjectTile from "../../components/content/tile/variants/project-tile";
import { getRequest } from "../../context/apis";
import AdminProtectedRoute from "../../components/hoc/AdminProtectedRoute";
import { UserContext } from "../../context/contextProvider";
import { useContext } from "react";
const Projects = ({ decode }) => {
  const { postContext } = useContext(UserContext);
  useEffect(() => {
    getProjects();
  }, []);
  const [projects, setProjects] = useState(null);

  /* Variable Declarations */
  const router = useRouter();

  /* Tile Option Handler */
  const handleEditProject = () => {
    router.push("/collateral/all-media").then((r) => r);
  };
  const getProjects = async () => {
    const { data } = await getRequest("auth/getProjects");
    if (data) setProjects(data);
  };
  const redirect = async (id: string) => {
    const payload = {
      email: "email@gmail.com",
      _id: decode.id,
      projectId: id,
      role: "Admin",
    };
    await signIn("redirect", { ...payload, redirect: false });
    window.location.href = "/collateral/generated";
  };
  return (
    <>
      <Header name={"Projects"} />
      {/*TODO: Pull in projects from database and populate Thumbnail list with Project Name, Project ID, and Project Logo*/}
      {/*TODO: Incorporate specific project ID to path thumbnail path*/}
      <TileGrid>
        {projects?.length
          ? projects?.map((project, index) => {
              return (
                <ProjectTile
                  id={project.id}
                  label={`${project.id} | ${project.name}`}
                  url={project.logo_url}
                  options={[["editProject", handleEditProject]]}
                  path={""}
                  key={index}
                  projectRoot={project.project_root}
                  click={(project: string) => {
                    redirect(project);
                  }}
                />
              );
            })
          : ""}
      </TileGrid>
    </>
  );
};

export default AdminProtectedRoute(Projects);
