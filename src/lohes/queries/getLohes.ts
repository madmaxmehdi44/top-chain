import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetLohesInput
  extends Pick<
    Prisma.LoheFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetLohesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: lohes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.lohe.count({ where }),
      query: (paginateArgs) =>
        db.lohe.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      lohes,
      nextPage,
      hasMore,
      count,
    };
  }
);
