import React, { ReactNode } from "react"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
import Heading from "./heading"

interface DashboardPageProps {
  title: string
  children?: ReactNode
  hideBackButton?: boolean
  cta?: ReactNode
}
function DashboardPage({
  title,
  children,
  hideBackButton,
  cta,
}: DashboardPageProps) {
  return (
    <section className="flex-1  h-full w-full flex flex-col">
      <div className=" p-6 sm:p-8 flex justify-between border-b border-gray-200">
        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-8">
          <div className="flex items-center gap-8">
            {hideBackButton ? null : (
              <Button className=" w-fit bg-white" variant={"outline"}>
                <ArrowLeft className=" size-4" />
              </Button>
            )}

            <Heading>{title}</Heading>
          </div>
          {cta ? <div>{cta}</div> : null}
        </div>
      </div>
      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  )
}

export default DashboardPage
