import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { rateLimit } from "@/lib/rate-limit"
import { auth } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
    const { success, limit, reset, remaining } = await rateLimit.limit(`ratelimit_${ip}`)

    if (!success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { 
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString()
        }
      })
    }

    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { integrations: true }
    })

    let prismaClient: PrismaClient = db as any;
    const integrations = user?.integrations as any;
    if (integrations?.database_url) {
      prismaClient = new PrismaClient({
        datasources: {
          db: {
            url: integrations.database_url,
          },
        },
      } as any) as any;
    }

    const forms = await prismaClient.form.findMany({
      where: { ownerId: session.user.id },
      orderBy: { updatedAt: "desc" }
    })

    if (integrations?.database_url) {
      await prismaClient.$disconnect();
    }

    return NextResponse.json({ forms })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
