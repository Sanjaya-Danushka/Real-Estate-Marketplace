import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { NextRequest } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  let evt
  try {
    evt = await verifyWebhook(req)
  } catch (err) {
    console.error("[webhook] Verification failed:", err)
    return new Response("Verification failed", { status: 400 })
  }

  console.log("[webhook] Received event:", evt.type, JSON.stringify(evt.data))

  try {
    switch (evt.type) {
      case "user.created":
      case "user.updated": {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data
        const email = email_addresses?.[0]?.email_address ?? null
        console.log("[webhook] Upserting user:", { id, email, first_name, last_name })
        const user = await db.user.upsert({
          where: { id },
          update: { email, firstName: first_name, lastName: last_name, imageUrl: image_url },
          create: { id, email, firstName: first_name, lastName: last_name, imageUrl: image_url },
        })
        console.log("[webhook] User upserted:", user.id)
        break
      }

      case "user.deleted": {
        const { id } = evt.data
        console.log("[webhook] Deleting user:", id)
        await db.user.deleteMany({ where: { id } })
        break
      }

      default:
        console.log("[webhook] Ignoring event:", evt.type)
    }
  } catch (err) {
    console.error("[webhook] DB error:", err)
    return new Response("DB error", { status: 500 })
  }

  return new Response("OK", { status: 200 })
}