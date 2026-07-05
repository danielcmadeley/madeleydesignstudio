import type { APIRoute } from "astro"
import { RESEND_API_KEY } from "astro:env/server"
import { Resend } from "resend"

export const prerender = false

const TO_EMAIL = "daniel@madeleydesignstudio.com"
// Sending from a custom address requires the domain to be verified in Resend
// (resend.com/domains). Until then, onboarding@resend.dev only delivers to the
// Resend account owner's email.
const FROM_EMAIL = "madeleydesignstudio <daniel@madeleydesignstudio.com>"

const PRODUCT_TYPES = ["AEC", "Software", "Marketing"] as const
const SERVICES = [
  "Marketing Sites",
  "Software Development",
  "UI/UX Design",
  "AEC Software",
  "AI Tools",
] as const

interface InquiryPayload {
  name?: string
  email?: string
  company?: string
  productType?: string
  services?: string[]
  message?: string
  website?: string
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function jsonResponse(body: object, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

export const POST: APIRoute = async ({ request }) => {
  let payload: InquiryPayload
  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400)
  }

  // Honeypot: real users never fill this hidden field.
  if (payload.website) {
    return jsonResponse({ ok: true }, 200)
  }

  const name = payload.name?.trim() ?? ""
  const email = payload.email?.trim() ?? ""
  const company = payload.company?.trim() ?? ""
  const message = payload.message?.trim() ?? ""

  const productType = PRODUCT_TYPES.find((type) => type === payload.productType)
  const services = Array.isArray(payload.services)
    ? SERVICES.filter((service) => payload.services?.includes(service))
    : []

  if (!name || name.length > 200) {
    return jsonResponse({ error: "Please provide your name." }, 400)
  }
  if (!email || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Please provide a valid email address." }, 400)
  }
  if (!productType) {
    return jsonResponse({ error: "Please select a product type." }, 400)
  }
  if (services.length === 0) {
    return jsonResponse({ error: "Please select at least one service." }, 400)
  }
  if (message.length > 5000) {
    return jsonResponse({ error: "Message is too long." }, 400)
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.")
    return jsonResponse(
      { error: "Email is not configured yet. Please try again later." },
      500,
    )
  }

  const resend = new Resend(RESEND_API_KEY)

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Product type", productType],
    ["Services", services.join(", ")],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b6b6b;">${label}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join("")

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject: `New enquiry — ${productType} — ${name}`,
    html: `
      <h2 style="margin:0 0 12px;">New "get your software" enquiry</h2>
      <table style="border-collapse:collapse;font-size:14px;">${rows}</table>
      ${message ? `<h3 style="margin:20px 0 8px;">Project details</h3><p style="white-space:pre-wrap;font-size:14px;">${escapeHtml(message)}</p>` : ""}
    `,
  })

  if (error) {
    console.error("Resend error:", error)
    return jsonResponse(
      { error: "Something went wrong sending your enquiry. Please try again." },
      500,
    )
  }

  return jsonResponse({ ok: true }, 200)
}
