import type { SanityImageSource } from "@sanity/image-url"

export type CtaLink = {
  label: string
  url: string
  openInNewTab?: boolean
}

export type PageSection = {
  eyebrow: string
  heading: string
  body: string
  backgroundColor: string
}

export type HeroSlideContent = {
  id: { current: string }
  verticalLabel: string
  headline: string
  subtext: string
  logoImage: SanityImageSource
  logoImageAlt?: string
  continuationImage: SanityImageSource
  continuationImageAlt?: string
  sections: PageSection[]
}

export type ServiceContent = {
  title: string
  description: string
  panelColor: string
  panelInnerColor: string
  panelBlockColor: string
}

export type HomePageContent = {
  heroCycleSeconds: number
  continuationTagline: string
  heroSlides: HeroSlideContent[]
  services: ServiceContent[]
  footer: PageSection
}

export type SiteSettingsContent = {
  siteName: string
  defaultTitle: string
  headerCta: CtaLink
}

export type HeroSlideView = {
  id: string
  headline: string
  subtext: string
  image: string
  flippedImage: string
  logoImageAlt: string
  continuationImageAlt: string
}

export type VerticalSectionView = PageSection & {
  slideIndex: number
}
