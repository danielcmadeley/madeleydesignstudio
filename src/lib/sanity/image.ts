import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"
import { sanityClient } from "sanity:client"

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function imageUrl(
  source: SanityImageSource | null | undefined,
  width?: number,
) {
  if (!source) return ""
  let image = urlFor(source).auto("format").fit("max").quality(80)
  if (width) image = image.width(width)
  return image.url()
}

export function imageSrcSet(
  source: SanityImageSource | null | undefined,
  widths: number[],
) {
  if (!source) return ""
  return widths
    .map((width) => `${imageUrl(source, width)} ${width}w`)
    .join(", ")
}

// Sanity asset filenames encode intrinsic size, e.g. …-2912x1632.png
export function imageDimensions(
  source: SanityImageSource | null | undefined,
): { width: number; height: number } | undefined {
  if (!source) return undefined
  const match = urlFor(source).url().match(/-(\d+)x(\d+)\.\w+/)
  if (!match) return undefined
  return { width: Number(match[1]), height: Number(match[2]) }
}
