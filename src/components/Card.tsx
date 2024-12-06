import { cn } from "@/lib/utils"
import React, { HTMLAttributes, ReactNode } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  contentClassName?: string
}
function Card({ children, className, contentClassName, ...props }: CardProps) {
  return (
    <div
      className={cn(
        " relative rounded-lg bg-gray-50 text-card-foreground",
        className
      )}
      {...props}
    >
      <div className={cn(" relative z-10 p-6", contentClassName)}>
        {children}
      </div>

      <div className=" absolute z-0 inset-px rounded-lg bg-brand-100" />
      <div className=" pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  )
}

export default Card
