import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@arachnidforms.com' },
    update: {},
    create: {
      email: 'demo@arachnidforms.com',
      name: 'Demo User',
      hashedPassword,
      forms: {
        create: [
          {
            title: 'Sample Contact Form',
            slug: 'sample-contact-form',
            description: 'A basic contact form',
            status: 'published',
            canvasData: { nodes: [], edges: [] }
          }
        ]
      },
      templates: {
        create: [
          {
            title: 'Feedback Survey Template',
            description: 'Template for customer feedback',
            isPublic: true,
            category: 'Survey',
            canvasData: { nodes: [], edges: [] }
          }
        ]
      }
    },
  })

  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
