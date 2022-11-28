import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetProjectsInput
  extends Pick<Prisma.ProjectFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProjectsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const {
    //   items: projects,
    //   hasMore,
    //   nextPage,
    //   count,
    // } = await paginate({
    //   skip,
    //   take,
    //   count: () => db.project.count({ where }),
    //   query: (paginateArgs) =>
    //     db.project.findMany({ ...paginateArgs, where, orderBy }),
    // });
    let projects
    try {
      const res = await fetch("http://localhost/wordpress/wp-json/mo/v1/posilist")
      // const resimg = await fetch("http://localhost/wordpress/wp-json/mo/v1/posilist")
      // if (!res) throw "hi"
      projects = await res.json()
    } catch {
      projects = "Error"
    }

    // const projects = data
    return {
      projects,
      // nextPage,
      // hasMore,
      // count,
    }
  }
)
