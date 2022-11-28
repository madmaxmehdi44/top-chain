import { Ctx } from "blitz"
import db, { GlobalRole, Membership, MembershipRole, User } from "db"

type CurrentUser = Partial<
  User & { roles: MembershipRole[] } & { memberships: Membership[] } & { role: GlobalRole }
>

export default async function getCurrentUser(
  _ = null,
  { session }: Ctx
): Promise<CurrentUser | null> {
  if (!session.userId) return null

  const user: CurrentUser | null = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, memberships: true, role: true },
  })
  if (!user) return null
  if (!user?.memberships) user.memberships = []

  const roles: MembershipRole[] = user.memberships.map((membership) => membership.role)
  // const roless: role
  return { ...user, ...{ roles } }
}
