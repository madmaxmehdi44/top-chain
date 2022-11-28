import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetProjectByStatus = z.object({
  // This accepts type of undefined, but is required at runtime
  post_status: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetProjectByStatus),
  resolver.authorize(),
  async ({ post_status }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const project = await db.project.findFirst({ where: { id } })
    // const id = context.params.id;
    // const res = await fetch("http://localhost/wordpress/wp-json/mo/v1/popo".toString().toLowerCase())
    const res = await fetch(
      `http://localhost/wordpress/wp-json/mo/v1/getpostbystatus/${post_status}`
    )
    const projectByStatus = await res.json()
    // const project = data
    // if (!project) throw "hi"

    return projectByStatus
  }
)
