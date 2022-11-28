import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getProjects from "src/projects/queries/getProjects"
import Image from "next/image"

const ITEMS_PER_PAGE = 50

export const ProjectsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const hasMore = 0
  const [{ projects }] = useQuery(getProjects, {})

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  const imgrefilter = projects.filter((proj) => proj.post_type === "attachment")

  function published_posts(project) {
    const imgresources = imgrefilter
    const imgrefilter1 = imgrefilter.map((pp) => (pp.post_parent === project.ID ? pp : null))

    const posttiti =
      project.post_type === "post" && project.post_status === "publish" ? (
        <li key={project.ID}>
          PID: {project.ID}
          <Link href={Routes.ShowProjectPage({ projectId: project.ID })}>
            {project.post_title}
          </Link>
          {imgresources
            .filter((projectt) => projectt.post_parent === project.ID)
            .map((projectt) => (
              <>
                {/* <h6>{JSON.stringify(projectt)}</h6> */}
                <Image
                  key={projectt.ID}
                  alt={projectt.post_title}
                  loader={() => projectt.guid}
                  src={projectt.guid}
                  width={100}
                  height={100}
                />
              </>
            ))}
          {/* // {image_posts(project)} */}
          <h6>Date: {project.post_date}</h6>
          {/* // <h1>Status : {project.post_status}</h1> */}
          {/* // <h6>post_Content : {project.post_content}</h6> */}
          {/* // <h1>Status : {project.post_status}</h1> */}
        </li>
      ) : null

    return posttiti
  }
  // const image_posts = (project) =>
  //   //  <Image src={project.guid} alt={project.post_title} width={100} height={100} /> // {/* <h6>{JSON.stringify(project)}</h6> */}
  //   project.post_type === "inherit" ? (
  //     <div>
  //       {/* {project.post_type} */}
  //       <Image
  //         alt={project.post_name}
  //         loader={() => project.guid}
  //         src={project.guid}
  //         width={100}
  //         height={100}
  //       />
  //     </div>
  //   ) : null

  // <h6>Date : {project.post_date}</h6>
  // {/* <h1>Status : {project.post_status}</h1> */}
  // {/* <h6>post_Content : {project.post_content}</h6> */}
  // {/* <h1>Status : {project.post_status}</h1> */}
  // </li>
  return (
    <div>
      {projects ? (
        projects === "Error" ? (
          "Error"
        ) : (
          <ul>{projects.map((project) => published_posts(project))}</ul>
        )
      ) : (
        "sdsd"
      )}
    </div>
  )
}

const ProjectsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Projects</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProjectPage()}>
            Create Project
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsList />
        </Suspense>
      </div>
    </Layout>
  );
}

export default ProjectsPage
