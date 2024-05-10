import { NOVA_LEMON_STORE_ID } from "./../lemonClient"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { lemonClient } from "../lemonClient"
import { env } from "src/env.mjs"
import db from "db"

const Input = z.object({
  variantId: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ variantId }, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) throw new Error("User not found")

    console.log("generating checkout link......")

    const checkoutLink = await lemonClient.createCheckout({
      storeId: env.LEMONSQUEEZY_STORE_ID,
      variantId: variantId,
      attributes: {
        checkout_data: {
          email: user.email,
          custom: {
            user_id: user.id,
          },
        },
      },
    })

    const { url } = checkoutLink.data.attributes

    console.log("checkoutLink", url)

    return url
  }
)
