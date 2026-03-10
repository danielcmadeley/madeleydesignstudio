import { ThemeProvider } from "next-themes"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { DirectionProvider } from "@/components/ui/direction"
import i18n, {
  directionForLanguage,
  type SupportedLanguage,
} from "@/i18n/config"

import { PaperSceneDesktop } from "./paper-scene-desktop"
import { PaperSceneMobile } from "./paper-scene-mobile"

export function ColorPanelsScene() {
  const { i18n: i18nInstance } = useTranslation()

  const resolvedLanguage = (i18nInstance.resolvedLanguage ?? "en")
    .toLowerCase()
    .split("-")[0]
  const language = (
    ["en", "fr", "es", "de", "ar"].includes(resolvedLanguage)
      ? resolvedLanguage
      : "en"
  ) as SupportedLanguage
  const direction = directionForLanguage(language)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = direction
    localStorage.setItem("site-language", language)
  }, [direction, language])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DirectionProvider direction={direction}>
        <div className="min-h-dvh w-full overflow-hidden bg-background">
          <PaperSceneMobile
            language={language}
            onLanguageChange={(nextLanguage) => {
              i18n.changeLanguage(nextLanguage)
            }}
          />
          <PaperSceneDesktop
            language={language}
            onLanguageChange={(nextLanguage) => {
              i18n.changeLanguage(nextLanguage)
            }}
          />
        </div>
      </DirectionProvider>
    </ThemeProvider>
  )
}
