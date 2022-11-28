import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteLohe = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteLohe),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const lohe = await db.lohe.deleteMany({ where: { id } });

    return lohe;
  }
);
