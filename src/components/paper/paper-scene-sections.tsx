import { useTranslation } from "react-i18next"

type SectionProps = {
  className: string
}

export function PaperIntroSection({ className }: SectionProps) {
  const { t } = useTranslation()

  return (
    <section className={className}>
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
  )
}

export function PaperContactSection({ className }: SectionProps) {
  const { t } = useTranslation()

  return (
    <section className={className}>
      <p>
        {t("content.contact1")}
        <br />
        <br />
        {t("content.contact2")}
      </p>
    </section>
  )
}
