import { sanityClient } from "sanity:client"
import { imageUrl } from "@/lib/sanity/image"
import { homePageQuery, siteSettingsQuery } from "@/lib/sanity/queries"
import type {
  HeroSlideView,
  HomePageContent,
  SiteSettingsContent,
  VerticalSectionView,
} from "@/lib/sanity/types"

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  const settings = await sanityClient.fetch<SiteSettingsContent | null>(
    siteSettingsQuery,
  )

  if (!settings) {
    throw new Error(
      "Site settings not found in Sanity. Run `bun run seed:sanity` after adding SANITY_API_WRITE_TOKEN to .env.",
    )
  }

  return settings
}

export async function getHomePage(): Promise<HomePageContent> {
  const page = await sanityClient.fetch<HomePageContent | null>(homePageQuery)

  if (!page) {
    throw new Error(
      "Home page content not found in Sanity. Run `bun run seed:sanity` after adding SANITY_API_WRITE_TOKEN to .env.",
    )
  }

  return page
}

export function toHeroSlides(page: HomePageContent): HeroSlideView[] {
  return page.heroSlides.map((slide) => ({
    id: slide.id.current,
    headline: slide.headline,
    subtext: slide.subtext,
    image: imageUrl(slide.logoImage),
    flippedImage: imageUrl(slide.continuationImage),
    logoImageAlt: slide.logoImageAlt ?? `${slide.verticalLabel} logo`,
    continuationImageAlt:
      slide.continuationImageAlt ?? `${slide.verticalLabel} continuation graphic`,
  }))
}

export function toVerticalSections(
  page: HomePageContent,
): VerticalSectionView[] {
  return page.heroSlides.flatMap((slide, slideIndex) =>
    slide.sections.map((section) => ({
      ...section,
      slideIndex,
    })),
  )
}
