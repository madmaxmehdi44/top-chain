// import db from "./index"

import { SecurePassword } from "@blitzjs/auth"
import db from "db"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  // Delete all existing data
  await db.membership.deleteMany()
  await db.organization.deleteMany()
  await db.token.deleteMany()
  await db.session.deleteMany()
  await db.user.deleteMany()

  const storeName = process.env.STORE_NAME || "mmco-commerce"
  const defaultStore = await db.organization.create({
    data: {
      name: storeName,
      permalink: storeName.toLowerCase().split(" ").join("_"),
      description: "MMCo is a big and professional Companey in the famuse Middle East",
    },
  })

  const hashedPassword = await SecurePassword.hash("123456789ab".trim())
  const user = await db.user.create({
    data: {
      email: "mehdi@mmco.com",
      hashedPassword,
      memberships: {
        create: {
          role: "USER",
          isDefault: false,
          organization: {
            connect: { id: defaultStore.id },
          },
        },
      },
    },
    select: { id: true, name: true, email: true, memberships: true },
  })

  const userStore = await db.organization.create({
    data: {
      name: "MMCo Store",
      permalink: "store_1",
      description: "store 1",
    },
  })

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      memberships: {
        create: {
          role: "OWNER",
          isDefault: true,
          organization: {
            connect: {
              id: userStore.id,
            },
          },
        },
      },
    },
  })
}

export default seed
