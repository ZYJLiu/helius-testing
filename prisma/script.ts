import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  // TODO: use reference and test populating database
  prisma.transaction.create({ data: {} })
}

main()
  .catch((e) => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect
  })
