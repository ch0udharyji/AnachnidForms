import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { FormList } from "./form-list"
import { Plus } from "lucide-react"
import { PrismaClient } from "@prisma/client"
import { createFormAction } from "@/app/actions/form"

export default async function FormsPage() {
  const session = await auth()
  
  const user = await db.user.findUnique({
    where: { id: session?.user?.id },
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
    where: { ownerId: session?.user?.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      _count: {
        select: { responses: true }
      }
    }
  })

  if (integrations?.database_url) {
    await prismaClient.$disconnect();
  }

  return (
    <div className="w-full h-full flex flex-col space-y-8 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Forms</h1>
          <p className="text-muted-foreground mt-1">Manage, edit, and share your forms.</p>
        </div>
        {forms.length > 0 && (
          <form action={createFormAction}>
            <Button type="submit" className="font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              <Plus className="w-4 h-4 mr-2" /> Create New Form
            </Button>
          </form>
        )}
      </div>

      <FormList forms={forms} />
    </div>
  )
}
