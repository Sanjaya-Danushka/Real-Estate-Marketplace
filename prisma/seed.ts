import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import properties from "../constants/dummyProperty"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        type: property.type,
        status: property.status,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        featured: property.featured,
        image: property.image,
        description: property.description,
      },
    })
  }

  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"Property"', 'id'), (SELECT MAX(id) FROM "Property"))`
  )

  console.log(`Seeded ${properties.length} properties`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())