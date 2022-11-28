import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetProject = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetProject), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const project = await db.project.findFirst({ where: { id } })
  // const id = context.params.id;
  // const res = await fetch("http://localhost/wordpress/wp-json/mo/v1/popo".toString().toLowerCase())
  const res = await fetch(`http://localhost/wordpress/wp-json/mo/v1/getPost/${id}`)
  const project = await res.json()
  // const project = data
  // if (!project) throw "hi"

  return project
})
