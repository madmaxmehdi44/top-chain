import { GlobalRole, MembershipRole, Organization, User } from "db"
import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
// export type Role = "ADMIN" | "USER"
type Role = MembershipRole | GlobalRole
declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      roles: Array<Role>
      orgIds?: Array<Organization["id"]>
    }
  }
}
