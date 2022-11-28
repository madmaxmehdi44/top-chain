import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateLohe = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateLohe),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const lohe = await db.lohe.update({ where: { id }, data });

    return lohe;
  }
);
