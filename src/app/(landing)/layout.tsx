import { ReactNode } from "react"
import Navbar from "@/components/navbar"

interface LayoutInterface {
  children: ReactNode
}
function Layout({ children }: LayoutInterface) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
