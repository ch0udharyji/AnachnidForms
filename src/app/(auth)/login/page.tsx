import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"

export default async function LoginPage() {
  const session = await auth()
  if (session?.user?.id) {
    redirect("/dashboard")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoginForm />
    </div>
  )
}

// [dev-log-sync]: 2f3f9e05961f275f