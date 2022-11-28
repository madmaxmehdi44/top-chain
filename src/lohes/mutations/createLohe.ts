import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateLohe = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateLohe),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const lohe = await db.lohe.create({ data: input });

    return lohe;
  }
);
