"use client"

import {
  ChevronDownIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const modeConfig = {
  light: { label: "Light", Icon: SunIcon },
  dark: { label: "Dark", Icon: MoonIcon },
  system: { label: "System", Icon: ComputerDesktopIcon },
} as const

export function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const selected = mounted
    ? modeConfig[(theme as keyof typeof modeConfig) || "system"]
    : modeConfig.system

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            size: compact ? "icon-sm" : "sm",
          }),
          compact
            ? "border-neutral-600/30 text-neutral-600"
            : "gap-1.5 border-neutral-900/20"
        )}
      >
        <selected.Icon className="size-4" />
        {compact ? (
          <span className="sr-only">Toggle theme</span>
        ) : (
          <>
            <span>{selected.label}</span>
            <ChevronDownIcon className="size-4" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-36">
        <DropdownMenuRadioGroup
          value={mounted ? (theme ?? "system") : "system"}
          onValueChange={(value) => setTheme(value)}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
