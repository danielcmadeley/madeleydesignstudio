import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PaperSceneLayoutProps = {
  className?: string
  children: ReactNode
}

export function PaperSceneLayout({
  className,
  children,
}: PaperSceneLayoutProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl border-x border-neutral-600 text-neutral-600 antialiased",
        className
      )}
    >
      {children}
    </div>
  )
}
