import {
  ColorPanels,
  DotGrid,
  GrainGradient,
} from "@paper-design/shaders-react"

import type { SupportedLanguage } from "@/i18n/config"

import { PaperSceneHeader } from "@/components/paper/paper-scene-header"
import {
  PaperContactSection,
  PaperIntroSection,
} from "@/components/paper/paper-scene-sections"

type PaperSceneDesktopProps = {
  language: SupportedLanguage
  onLanguageChange: (nextLanguage: SupportedLanguage) => void
}

export function PaperSceneDesktop({
  language,
  onLanguageChange,
}: PaperSceneDesktopProps) {
  return (
    <div className="relative hidden min-h-[1147px] overflow-hidden bg-background xl:block">
      <div className="absolute left-1/2 top-0 h-[1147px] w-[1718px] -translate-x-1/2 text-neutral-600 antialiased">
        <div className="absolute left-[411px] top-0 h-[1147px] w-px bg-neutral-600" />
        <div className="absolute left-[1306px] top-0 h-[1147px] w-px bg-neutral-600" />

        <div className="absolute inset-x-0 top-[50px] h-px bg-neutral-600" />
        <div className="absolute inset-x-0 top-[101px] h-px bg-neutral-600" />
        <div className="absolute inset-x-0 top-[602px] h-px bg-neutral-600" />
        <div className="absolute inset-x-0 top-[973px] h-px bg-neutral-600" />
        <div className="absolute inset-x-0 top-[1096px] h-px bg-neutral-600" />

        <PaperSceneHeader
          language={language}
          onLanguageChange={onLanguageChange}
          compactControls
          className="absolute left-[411px] top-0 flex h-[50px] w-[896px] items-center justify-between px-3"
        />

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
          className="absolute left-[411px] top-[51px] h-[50px] w-[896px]"
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
          className="absolute left-1/2 top-1/2 h-[600px] w-[800px] origin-top-left"
          style={{
            transform:
              "translate(calc(-50% + 127.094px), calc(-50% - 340.454px)) rotate(20.05deg)",
          }}
        />

        <div className="absolute left-[411px] top-[94px] h-[15px] w-px bg-neutral-900" />
        <div className="absolute left-[404px] top-[101px] h-px w-[15px] bg-neutral-900" />
        <div className="absolute left-[1306px] top-[94px] h-[15px] w-px bg-neutral-900" />
        <div className="absolute left-[1299px] top-[101px] h-px w-[15px] bg-neutral-900" />
        <div className="absolute left-[1306px] top-[595px] h-[15px] w-px bg-neutral-900" />
        <div className="absolute left-[1299px] top-[602px] h-px w-[15px] bg-neutral-900" />
        <div className="absolute left-[411px] top-[595px] h-[15px] w-px bg-neutral-900" />
        <div className="absolute left-[404px] top-[602px] h-px w-[15px] bg-neutral-900" />

        <div
          className="absolute left-1/2 top-[102px] h-px w-[500px] origin-top-left bg-neutral-600"
          style={{ rotate: "90deg", translate: "-50%" }}
        />
        <div
          className="absolute left-[calc(50%+501px)] top-[102px] h-px w-[500px] origin-top-left bg-neutral-600"
          style={{ rotate: "90deg", translate: "-50%" }}
        />

        <PaperIntroSection className="absolute left-[608px] top-[653px] w-[501px] text-left text-sm leading-[18px] rtl:text-right" />
        <PaperContactSection className="absolute left-[609px] top-[999px] w-[501px] text-left text-sm leading-[18px] rtl:text-right" />

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
          className="absolute left-[411px] top-[1095px] h-[121px] w-[411px] origin-top-left rotate-180 opacity-25"
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
          className="absolute left-[1307px] top-[974px] h-[121px] w-[411px] opacity-25"
        />
      </div>
    </div>
  )
}
