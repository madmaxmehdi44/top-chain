import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"

// export const useCurrentUser = () => {
//   const [user] = useQuery(getCurrentUser, null)
//   return user
// }
export const useCurrentUser = () => {
  const [user, roles] = useQuery(getCurrentUser, null)
  return { ...user, ...{ roles } }
}
