import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null
  // true means, get the value
  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerifiedAt: true,
      username: true,
      avatarImageKey: true,
      bio: true,
      onboarded: true,
      hasLifetimeAccess: true,
    },
  })

  return user
}
