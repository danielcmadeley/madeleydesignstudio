import {
  ColorPanels,
  DotGrid,
  GrainGradient,
} from "@paper-design/shaders-react"
import { ThemeProvider } from "next-themes"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { LanguageToggle } from "@/components/theme/language-toggle"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { DirectionProvider } from "@/components/ui/direction"
import i18n, {
  directionForLanguage,
  type SupportedLanguage,
} from "@/i18n/config"

export function ColorPanelsScene() {
  const { t } = useTranslation()
  const language = (i18n.resolvedLanguage ?? "en") as SupportedLanguage
  const direction = directionForLanguage(language)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = direction
    localStorage.setItem("site-language", language)
  }, [direction, language])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DirectionProvider direction={direction}>
        <div className="relative min-h-[1147px] overflow-clip bg-background text-neutral-600 antialiased">
          <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-full w-full max-w-4xl -translate-x-1/2 border-x border-neutral-600" />
          <div className="pointer-events-none absolute inset-x-0 top-[50px] z-10 h-px bg-neutral-600" />
          <div className="pointer-events-none absolute inset-x-0 top-[101px] z-10 h-px bg-neutral-600" />
          <div className="pointer-events-none absolute inset-x-0 top-[602px] z-10 h-px bg-neutral-600" />
          <div className="pointer-events-none absolute inset-x-0 top-[973px] z-10 h-px bg-neutral-600" />
          <div className="pointer-events-none absolute inset-x-0 top-[1096px] z-10 h-px bg-neutral-600" />

          <header className="absolute left-1/2 top-0 z-20 flex h-[50px] w-full max-w-4xl -translate-x-1/2 items-center justify-between px-3">
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
            <div className="flex items-center gap-2">
              <LanguageToggle
                value={language}
                onChange={(nextLanguage) => {
                  i18n.changeLanguage(nextLanguage)
                }}
              />
              <ModeToggle compact />
            </div>
          </header>

          <DotGrid
            size={0.3}
            gapX={11}
            gapY={10}
            strokeWidth={0}
            sizeRange={0}
            opacityRange={0}
            shape="square"
            colorFill="#171717"
            colorStroke="#00000000"
            colorBack="#00000000"
            className="pointer-events-none absolute left-1/2 top-[51px] z-0 h-[50px] w-full max-w-4xl -translate-x-1/2"
          />

          <ColorPanels
            speed={1}
            scale={0.53}
            density={1.6}
            angle1={0.3}
            angle2={0.3}
            length={1}
            edges
            blur={0.25}
            fadeIn={0.85}
            fadeOut={0.3}
            gradient={0}
            rotation={112}
            offsetX={0}
            offsetY={0}
            colors={["#957ED1", "#8F6DAF", "#BE8DDB", "#7F6390"]}
            colorBack="#00000000"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] origin-top-left"
            style={{
              transform:
                "translate(calc(-50% + 127.094px), calc(-50% - 340.454px)) rotate(20.05deg)",
            }}
          />

          <div className="pointer-events-none absolute left-[411px] top-[94px] z-20 h-[15px] w-px bg-neutral-900" />
          <div className="pointer-events-none absolute left-[404px] top-[101px] z-20 h-px w-[15px] bg-neutral-900" />
          <div className="pointer-events-none absolute left-[1306px] top-[94px] z-20 h-[15px] w-px bg-neutral-900" />
          <div className="pointer-events-none absolute left-[1299px] top-[101px] z-20 h-px w-[15px] bg-neutral-900" />
          <div className="pointer-events-none absolute left-[1306px] top-[595px] z-20 h-[15px] w-px bg-neutral-900" />
          <div className="pointer-events-none absolute left-[1299px] top-[602px] z-20 h-px w-[15px] bg-neutral-900" />
          <div className="pointer-events-none absolute left-[411px] top-[595px] z-20 h-[15px] w-px bg-neutral-900" />
          <div className="pointer-events-none absolute left-[404px] top-[602px] z-20 h-px w-[15px] bg-neutral-900" />

          <div
            className="pointer-events-none absolute left-1/2 top-[102px] z-10 h-px w-[500px] origin-top-left bg-neutral-600"
            style={{ rotate: "90deg", translate: "-50%" }}
          />
          <div
            className="pointer-events-none absolute left-[calc(50%+501px)] top-[102px] z-10 h-px w-[500px] origin-top-left bg-neutral-600"
            style={{ rotate: "90deg", translate: "-50%" }}
          />

          <section className="absolute left-[608px] top-[653px] z-20 w-[501px] text-left text-sm leading-[18px] text-neutral-600 rtl:text-right">
            <p>
              {t("content.intro1")}
              <br />
              <br />
              {t("content.intro2")}
              <br />
              <br />
              {t("content.intro3")}
              <br />
              <br />
              {t("content.intro4")}
              <br />
              <br />
              {t("content.intro5")}
            </p>
          </section>

          <section className="absolute left-[609px] top-[999px] z-20 w-[501px] text-left text-sm leading-[18px] text-neutral-600 rtl:text-right">
            <p>
              {t("content.contact1")}
              <br />
              <br />
              {t("content.contact2")}
            </p>
          </section>

          <GrainGradient
            speed={1}
            scale={1}
            rotation={0}
            offsetX={0}
            offsetY={0}
            softness={0.5}
            intensity={0.5}
            noise={0.25}
            shape="dots"
            colors={["#7300FF", "#EBA8FF", "#00BFFF", "#2A00FF"]}
            colorBack="#00000000"
            className="pointer-events-none absolute left-[411px] top-[1095px] h-[121px] w-[411px] origin-top-left rotate-180 opacity-25"
          />
          <GrainGradient
            speed={1}
            scale={1}
            rotation={0}
            offsetX={0}
            offsetY={0}
            softness={0.5}
            intensity={0.5}
            noise={0.25}
            shape="dots"
            colors={["#7300FF", "#EBA8FF", "#00BFFF", "#2A00FF"]}
            colorBack="#00000000"
            className="pointer-events-none absolute left-[1307px] top-[974px] h-[121px] w-[411px] opacity-25"
          />
        </div>
      </DirectionProvider>
    </ThemeProvider>
  )
}
