import type { SupportedLanguage } from "@/i18n/config"
import { useTranslation } from "react-i18next"

import { LanguageToggle } from "@/components/theme/language-toggle"
import { ModeToggle } from "@/components/theme/mode-toggle"

type PaperSceneHeaderProps = {
  language: SupportedLanguage
  onLanguageChange: (nextLanguage: SupportedLanguage) => void
  className?: string
  compactControls?: boolean
}

export function PaperSceneHeader({
  language,
  onLanguageChange,
  className,
  compactControls = true,
}: PaperSceneHeaderProps) {
  const { t } = useTranslation()

  return (
    <header
      className={className ?? "flex h-[50px] items-center justify-between px-3"}
    >
      <div className="flex items-start gap-2.5">
        <svg
          viewBox="0 0 13 15"
          className="mt-0.5 h-[26px] w-[22px] fill-neutral-600"
          aria-hidden="true"
        >
          <path d="M0 0.58L0.902 0V6.884L1.428 7.101L2.029 6.884L2.555 5.797L4.434 0.797L4.734 0.435L5.11 0.145L5.561 0H6.012L6.387 0.217L6.688 0.58L6.838 1.377L6.913 2.101L6.988 6.884L7.289 7.101H7.74L8.116 6.739L8.566 6.014L9.017 4.565L9.543 3.188L9.994 1.957L10.37 1.232L10.746 0.58L11.272 0.217L11.798 0H12.399L12.624 0.217L12.85 0.58L13 0.797V14.42L12.249 14.855V8.261L12.098 7.899H11.347L11.197 8.043L11.046 8.261L10.896 8.551L10.746 8.841L10.595 9.058V9.493L10.445 9.855L10.295 10.362L10.145 10.725L9.994 11.232L9.844 11.739L9.618 12.246L9.243 13.188L8.867 13.841L8.566 14.203L8.116 14.638L7.815 14.855L7.59 14.928H7.064L6.613 14.71L6.312 14.275V12.681L6.237 9.783L6.162 8.478L5.861 7.971H5.335L4.96 8.478L3.381 12.536L2.63 13.986L2.029 14.71L1.202 15L0.451 14.71L0 14.13V0.58Z" />
        </svg>
        <div>
          <p className="text-sm leading-[18px] font-bold tracking-[-0.01em]">
            {t("brand.name")}
          </p>
          <p className="text-xs leading-4 font-light tracking-[-0.01em]">
            {t("brand.tagline")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <LanguageToggle
          compact={compactControls}
          value={language}
          onChange={onLanguageChange}
        />
        <ModeToggle compact />
      </div>
    </header>
  )
}
