"use server"
import DashboardPage from "@/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashBoardPageContent from "./dashboard-page-content"
import CreateEventCategoryModel from "@/components/create-event-category-model"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

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

  return (
    <DashboardPage
      cta={
        <CreateEventCategoryModel>
          <Button className="w-fit">
            <PlusIcon className="size-4 mr-2" />
            Add Category
          </Button>
        </CreateEventCategoryModel>
      }
      title="Dashboard"
    >
      <DashBoardPageContent />
    </DashboardPage>
  )
}

export default Page
