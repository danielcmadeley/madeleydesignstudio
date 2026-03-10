import { ColorPanels, DotGrid } from "@paper-design/shaders-react"

import type { SupportedLanguage } from "@/i18n/config"

import { PaperSceneHeader } from "@/components/paper/paper-scene-header"
import { PaperSceneLayout } from "@/components/paper/paper-scene-layout"
import {
  PaperContactSection,
  PaperIntroSection,
} from "@/components/paper/paper-scene-sections"

type PaperSceneMobileProps = {
  language: SupportedLanguage
  onLanguageChange: (nextLanguage: SupportedLanguage) => void
}

export function PaperSceneMobile({
  language,
  onLanguageChange,
}: PaperSceneMobileProps) {
  return (
    <div className="xl:hidden">
      <PaperSceneLayout>
        <PaperSceneHeader
          language={language}
          onLanguageChange={onLanguageChange}
          compactControls
        />

        <div className="relative h-[50px] border-y border-neutral-600">
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
            className="absolute inset-0"
          />
        </div>

        <section className="relative h-[420px] border-b border-neutral-600 sm:h-[500px]">
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 border-x border-neutral-600" />

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
            className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] origin-top-left"
            style={{
              transform:
                "translate(calc(-50% + 14px), calc(-50% - 18px)) rotate(20.05deg)",
            }}
          />
        </section>

        <PaperIntroSection className="border-b border-neutral-600 px-6 py-8 text-left text-sm leading-[18px] rtl:text-right" />
        <PaperContactSection className="border-b border-neutral-600 px-6 py-8 text-left text-sm leading-[18px] rtl:text-right" />
      </PaperSceneLayout>
    </div>
  )
}
