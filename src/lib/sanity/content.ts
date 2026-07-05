import { sanityClient } from "sanity:client"
import { imageDimensions, imageSrcSet, imageUrl } from "@/lib/sanity/image"
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

// Logos render in a ~200px box (400px covers retina); continuation images
// span the full viewport width, so ship a srcset instead of the original.
const LOGO_WIDTH = 400
const CONTINUATION_WIDTHS = [640, 960, 1280, 1920]

export function toHeroSlides(page: HomePageContent): HeroSlideView[] {
  return page.heroSlides.map((slide) => {
    const flippedDimensions = imageDimensions(slide.continuationImage)

    return {
      id: slide.id.current,
      headline: slide.headline,
      subtext: slide.subtext,
      image: imageUrl(slide.logoImage, LOGO_WIDTH),
      flippedImage: imageUrl(slide.continuationImage, 1280),
      flippedImageSrcSet: imageSrcSet(
        slide.continuationImage,
        CONTINUATION_WIDTHS,
      ),
      flippedImageWidth: flippedDimensions?.width,
      flippedImageHeight: flippedDimensions?.height,
      logoImageAlt: slide.logoImageAlt ?? `${slide.verticalLabel} logo`,
      continuationImageAlt:
        slide.continuationImageAlt ??
        `${slide.verticalLabel} continuation graphic`,
    }
  })
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
