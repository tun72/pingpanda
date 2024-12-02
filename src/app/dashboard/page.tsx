"use server"
import DashboardPage from "@/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashBoardPageContent from "./dashboard-page-content"

async function Page() {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/sign-in")
  }

  return <DashboardPage title="Dashboard">
    <DashBoardPageContent />
  </DashboardPage>
}

export default Page
