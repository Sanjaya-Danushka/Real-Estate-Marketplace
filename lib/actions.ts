"use server"

import { revalidatePath } from "next/cache"
import { type PropertyTypes } from "@/constants/dummyProperty"
import { db } from "@/lib/db"

export type PropertyInput = Omit<PropertyTypes, "id">

export async function savePropertyAction(input: PropertyInput) {
  const property = await db.property.create({ data: input })

  revalidatePath("/", "layout")
  revalidatePath("/marketplace", "layout")
  revalidatePath("/properties", "layout")

  return property
}