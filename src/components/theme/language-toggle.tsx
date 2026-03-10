"use client"

import { LanguageIcon } from "@heroicons/react/24/outline"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { SupportedLanguage } from "@/i18n/config"
import { cn } from "@/lib/utils"

const languageLabels: Record<SupportedLanguage, string> = {
  en: "English",
  fr: "Francais",
  es: "Espanol",
  de: "Deutsch",
  ar: "العربية",
}

type LanguageToggleProps = {
  value: SupportedLanguage
  onChange: (value: SupportedLanguage) => void
}

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  const shortLabel = value.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "h-7 gap-1.5 border-neutral-600/30 px-2 text-neutral-600"
        )}
      >
        <LanguageIcon className="size-3.5" />
        <span className="text-[11px] font-semibold tracking-wide">
          {shortLabel}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-40">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => onChange(next as SupportedLanguage)}
        >
          <DropdownMenuRadioItem value="en">
            {languageLabels.en}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="fr">
            {languageLabels.fr}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="es">
            {languageLabels.es}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="de">
            {languageLabels.de}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ar">
            {languageLabels.ar}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
