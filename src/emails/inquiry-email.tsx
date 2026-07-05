import {
  Body,
  Container,
  Column,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

export interface InquiryEmailProps {
  name: string
  email: string
  company: string
  productType: string
  services: string[]
  message: string
}

const colors = {
  brandRed: "#BA0000",
  cream: "#F8EACD",
  ink: "#353535",
  white: "#FFFFFF",
}

const heading = "'Outfit', Helvetica, Arial, sans-serif"

const eyebrowStyle = {
  margin: "0 0 8px",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: colors.brandRed,
}

const labelStyle = {
  margin: 0,
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "rgba(53, 53, 53, 0.6)",
}

const valueStyle = {
  margin: "2px 0 0",
  fontSize: "15px",
  color: colors.ink,
}

export default function InquiryEmail({
  name,
  email,
  company,
  productType,
  services,
  message,
}: InquiryEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Outfit"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0C4G-EiAou6Y.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        {`${name} — ${productType} enquiry via madeleydesignstudio.com`}
      </Preview>
      <Body
        style={{
          margin: 0,
          backgroundColor: colors.cream,
          fontFamily: heading,
        }}
      >
        <Container style={{ maxWidth: "560px", padding: "32px 16px" }}>
          <Section
            style={{
              backgroundColor: colors.cream,
              border: `1px solid ${colors.brandRed}`,
            }}
          >
            <Row
              style={{
                borderBottom: `1px solid ${colors.brandRed}`,
              }}
            >
              <Column style={{ padding: "14px 20px" }}>
                <Text
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: colors.ink,
                  }}
                >
                  madeleydesign
                  <span style={{ color: colors.brandRed }}>studio.</span>
                </Text>
              </Column>
              <Column
                style={{
                  padding: "14px 20px",
                  backgroundColor: colors.brandRed,
                  textAlign: "right" as const,
                  width: "140px",
                }}
              >
                <Text
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: colors.white,
                    textTransform: "lowercase" as const,
                  }}
                >
                  new enquiry →
                </Text>
              </Column>
            </Row>

            <Section style={{ padding: "28px 20px 8px" }}>
              <Text style={eyebrowStyle}>get your software</Text>
              <Heading
                as="h1"
                style={{
                  margin: 0,
                  fontSize: "24px",
                  lineHeight: "1.2",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: colors.ink,
                }}
              >
                {name} wants to build with you.
              </Heading>
            </Section>

            <Section style={{ padding: "12px 20px 4px" }}>
              <Text style={labelStyle}>name</Text>
              <Text style={valueStyle}>{name}</Text>

              <Text style={{ ...labelStyle, marginTop: "16px" }}>email</Text>
              <Text style={valueStyle}>
                <Link
                  href={`mailto:${email}`}
                  style={{ color: colors.brandRed }}
                >
                  {email}
                </Link>
              </Text>

              <Text style={{ ...labelStyle, marginTop: "16px" }}>company</Text>
              <Text style={valueStyle}>{company || "—"}</Text>

              <Text style={{ ...labelStyle, marginTop: "16px" }}>
                product type
              </Text>
              <Text style={valueStyle}>{productType}</Text>

              <Text style={{ ...labelStyle, marginTop: "16px" }}>
                services required
              </Text>
              <Text style={valueStyle}>{services.join(", ")}</Text>
            </Section>

            {message ? (
              <Section style={{ padding: "8px 20px 4px" }}>
                <Hr
                  style={{
                    margin: "12px 0 20px",
                    borderColor: "rgba(53, 53, 53, 0.25)",
                  }}
                />
                <Text style={labelStyle}>project details</Text>
                <Text
                  style={{
                    ...valueStyle,
                    marginTop: "8px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap" as const,
                  }}
                >
                  {message}
                </Text>
              </Section>
            ) : null}

            <Section style={{ padding: "12px 20px 24px" }}>
              <Text
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "rgba(53, 53, 53, 0.5)",
                }}
              >
                Sent from the get-your-software form on madeleydesignstudio.com
                — reply to this email to respond directly.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

InquiryEmail.PreviewProps = {
  name: "Jane Smith",
  email: "jane@company.com",
  company: "Company Ltd",
  productType: "AEC",
  services: ["AEC Software", "AI Tools"],
  message:
    "We run a structural engineering practice and keep working around our analysis tooling.\n\nLooking for a parametric tool that plugs into our existing workflow.",
} satisfies InquiryEmailProps
