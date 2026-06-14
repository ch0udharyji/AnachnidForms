import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { RegisterForm } from "@/components/auth/register-form"

export default async function RegisterPage(props: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const session = await auth()
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams.callbackUrl || "/dashboard";

  if (session?.user?.id) {
    redirect(callbackUrl)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <RegisterForm />
    </div>
  )
}
