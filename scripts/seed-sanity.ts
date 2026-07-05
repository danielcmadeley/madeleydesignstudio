import { createClient, type SanityClient } from "@sanity/client"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? "a0grmhhc"
const dataset = process.env.PUBLIC_SANITY_DATASET ?? "production"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN in .env.\nCreate a token at https://sanity.io/manage → API → Tokens (Editor permissions).",
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-03-01",
  useCdn: false,
})

async function uploadImage(
  sanityClient: SanityClient,
  filePath: string,
  filename: string,
) {
  const buffer = readFileSync(filePath)
  return sanityClient.assets.upload("image", buffer, { filename })
}

const verticals = [
  {
    id: "aec",
    label: "AEC",
    headline: "Design software for people who design buildings.",
    subtext: "We build tailored software systems for the AEC industry.",
    logoFile: "hero-AEC.png",
    continuationFile: "hero-AEC-flipped.png",
    sectionBackground: "#FDE9C1",
  },
  {
    id: "marketing",
    label: "Marketing",
    headline: "Sites for businesses worth showing off.",
    subtext: "We build marketing sites for brands that need to stand out.",
    logoFile: "hero-marketing.png",
    continuationFile: "hero-marketing-flipped.png",
    sectionBackground: "#F8EACD",
  },
  {
    id: "software",
    label: "Software",
    headline: "We build the software you've been working around.",
    subtext:
      "We build custom software for teams for whom off-the-shelf tools have failed.",
    logoFile: "hero-software.png",
    continuationFile: "hero-software-flipped.png",
    sectionBackground: "#fff5e1",
  },
] as const

const uniqueSectionLabels = ["One", "Two", "Three"] as const

const services = [
  {
    id: "marketing-sites",
    title: "Marketing Sites",
    description:
      "We craft beautiful marketing sites, all shipped with a CMS so your marketing team can control the content.",
    panelColor: "#C43B2B",
    panelInnerColor: "#C50D0D",
    panelBlockColor: "#992A20",
  },
  {
    id: "software-development",
    title: "Software Development",
    description:
      "We build custom software for teams whose off-the-shelf tools have failed them.",
    panelColor: "#C22A52",
    panelInnerColor: "#BE0048",
    panelBlockColor: "#7E1638",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "We design interfaces that make complex workflows feel simple, tested with the people who actually use them.",
    panelColor: "#DE81A8",
    panelInnerColor: "#E890B2",
    panelBlockColor: "#C7688F",
  },
  {
    id: "aec-software",
    title: "AEC Software",
    description:
      "We build tailored software systems for the AEC industry, from parametric tools to project platforms.",
    panelColor: "#E2AEC5",
    panelInnerColor: "#EBC0D2",
    panelBlockColor: "#D598B4",
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    description:
      "We build AI tools that slot into your existing workflow and take the repetitive work off your team's plate.",
    panelColor: "#AF9BDB",
    panelInnerColor: "#BFACE7",
    panelBlockColor: "#9C86D2",
  },
] as const

async function main() {
  console.log("Uploading hero images…")

  const heroSlides = []

  for (const vertical of verticals) {
    const logoImage = await uploadImage(
      client,
      join("public", vertical.logoFile),
      vertical.logoFile,
    )
    const continuationImage = await uploadImage(
      client,
      join("public", vertical.continuationFile),
      vertical.continuationFile,
    )

    heroSlides.push({
      _type: "heroSlide",
      _key: vertical.id,
      id: { _type: "slug", current: vertical.id },
      verticalLabel: vertical.label,
      headline: vertical.headline,
      subtext: vertical.subtext,
      logoImage: {
        _type: "image",
        asset: { _type: "reference", _ref: logoImage._id },
      },
      logoImageAlt: `${vertical.label} logo`,
      continuationImage: {
        _type: "image",
        asset: { _type: "reference", _ref: continuationImage._id },
      },
      continuationImageAlt: `${vertical.label} continuation graphic`,
      sections: uniqueSectionLabels.map((sectionLabel, sectionIndex) => ({
        _type: "pageSection",
        _key: `${vertical.id}-${sectionIndex + 1}`,
        eyebrow: vertical.label,
        heading: `Unique section ${sectionLabel}`,
        body: `Placeholder content for ${vertical.label.toLowerCase()} section ${sectionIndex + 1}.`,
        backgroundColor: vertical.sectionBackground,
      })),
    })
  }

  console.log("Creating site settings…")

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "madeleydesignstudio.",
    defaultTitle: "madeleydesignstudio.",
    headerCta: {
      _type: "ctaLink",
      label: "get your software →",
      url: "/get-your-software",
      openInNewTab: false,
    },
  })

  console.log("Creating home page…")

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroCycleSeconds: 6,
    continuationTagline: "Software that fits how your team actually works.",
    heroSlides,
    services: services.map((service) => ({
      _type: "service",
      _key: service.id,
      title: service.title,
      description: service.description,
      panelColor: service.panelColor,
      panelInnerColor: service.panelInnerColor,
      panelBlockColor: service.panelBlockColor,
    })),
    footer: {
      _type: "pageSection",
      eyebrow: "Footer",
      heading: "Shared footer",
      body: "Placeholder footer content.",
      backgroundColor: "#BA0000",
    },
  })

  console.log("Done. Open /admin to review and edit your content.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
