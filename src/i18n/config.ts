import i18n from "i18next"
import { initReactI18next } from "react-i18next"

export const supportedLanguages = ["en", "fr", "es", "de", "ar"] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

const isSupportedLanguage = (value: string): value is SupportedLanguage => {
  return supportedLanguages.includes(value as SupportedLanguage)
}

const normalizeLanguage = (value: string) => {
  return value.toLowerCase().split("-")[0]
}

const detectLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") {
    return "en"
  }

  const stored = localStorage.getItem("site-language")
  if (stored && isSupportedLanguage(stored)) {
    return stored
  }

  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  for (const candidate of browserLanguages) {
    const normalized = normalizeLanguage(candidate)
    if (isSupportedLanguage(normalized)) {
      return normalized
    }
  }

  return "en"
}

export const directionForLanguage = (language: SupportedLanguage) => {
  return language === "ar" ? "rtl" : "ltr"
}

const resources = {
  en: {
    translation: {
      brand: {
        name: "madeleydesignstudio",
        tagline: "market -> design -> develop -> launch",
      },
      content: {
        intro1: "We help founders turn ideas into products and brands.",
        intro2:
          "We're Daniel and Nadine, a marketing-developer duo behind madeleydesignstudio. We work closely with teams we believe in.",
        intro3: "market -> design -> develop -> launch -> repeat...",
        intro4:
          "We like projects where design and code move together, so nothing gets lost in translation, through from concept to execution.",
        intro5:
          "We're drawn to new ideas. We dive in fast, and explore broadly. Whether we're shaping early ideas, refining products in production, or crafting bold visuals for one-off moments, we make sure everything feels cohesive and on-brand.",
        contact1:
          "If you share this vision, and are looking for a partner to push your product forward, say hello@madeleydesignstudio.com",
        contact2: "Based in United Kingdom, available remotely.",
      },
    },
  },
  fr: {
    translation: {
      brand: {
        name: "madeleydesignstudio",
        tagline: "marketing -> design -> developpement -> lancement",
      },
      content: {
        intro1:
          "Nous aidons les fondateurs a transformer leurs idees en produits et en marques.",
        intro2:
          "Nous sommes Daniel et Nadine, un duo marketing-developpement derriere madeleydesignstudio. Nous collaborons avec des equipes en lesquelles nous croyons.",
        intro3:
          "marketing -> design -> developpement -> lancement -> repetition...",
        intro4:
          "Nous aimons les projets ou design et code avancent ensemble, pour que rien ne se perde entre le concept et l'execution.",
        intro5:
          "Nous sommes attires par les nouvelles idees. Nous plongeons vite et explorons large. Qu'il s'agisse de structurer des idees naissantes, d'ameliorer des produits en production ou de creer des visuels forts pour des moments ponctuels, nous veillons a une experience coherente et fidele a la marque.",
        contact1:
          "Si vous partagez cette vision et cherchez un partenaire pour faire avancer votre produit, ecrivez a hello@madeleydesignstudio.com",
        contact2: "Bases au Royaume-Uni, disponibles a distance.",
      },
    },
  },
  es: {
    translation: {
      brand: {
        name: "madeleydesignstudio",
        tagline: "marketing -> diseno -> desarrollo -> lanzamiento",
      },
      content: {
        intro1:
          "Ayudamos a fundadores a convertir ideas en productos y marcas.",
        intro2:
          "Somos Daniel y Nadine, un duo de marketing y desarrollo detras de madeleydesignstudio. Trabajamos de cerca con equipos en los que creemos.",
        intro3:
          "marketing -> diseno -> desarrollo -> lanzamiento -> repetir...",
        intro4:
          "Nos gustan los proyectos donde diseno y codigo avanzan juntos, para que nada se pierda desde el concepto hasta la ejecucion.",
        intro5:
          "Nos atraen las ideas nuevas. Entramos rapido y exploramos a fondo. Ya sea dando forma a ideas tempranas, refinando productos en produccion o creando visuales potentes para momentos concretos, nos aseguramos de que todo se sienta coherente y fiel a la marca.",
        contact1:
          "Si compartes esta vision y buscas un socio para impulsar tu producto, escribe a hello@madeleydesignstudio.com",
        contact2: "Con base en Reino Unido, disponibles en remoto.",
      },
    },
  },
  de: {
    translation: {
      brand: {
        name: "madeleydesignstudio",
        tagline: "marketing -> design -> entwicklung -> launch",
      },
      content: {
        intro1:
          "Wir helfen Gruendern dabei, Ideen in Produkte und Marken zu verwandeln.",
        intro2:
          "Wir sind Daniel und Nadine, ein Marketing- und Entwicklungsduo hinter madeleydesignstudio. Wir arbeiten eng mit Teams zusammen, an die wir glauben.",
        intro3:
          "marketing -> design -> entwicklung -> launch -> wiederholen...",
        intro4:
          "Wir lieben Projekte, bei denen Design und Code gemeinsam vorangehen, damit zwischen Konzept und Umsetzung nichts verloren geht.",
        intro5:
          "Uns begeistern neue Ideen. Wir steigen schnell ein und erkunden breit. Ob wir fruehe Ideen ausarbeiten, Produkte im Live-Betrieb weiterentwickeln oder starke Visuals fuer besondere Momente gestalten, wir sorgen dafuer, dass alles stimmig und markentreu bleibt.",
        contact1:
          "Wenn du diese Vision teilst und einen Partner suchst, der dein Produkt voranbringt, schreib an hello@madeleydesignstudio.com",
        contact2: "Sitz in Grossbritannien, remote verfuegbar.",
      },
    },
  },
  ar: {
    translation: {
      brand: {
        name: "madeleydesignstudio",
        tagline: "تسويق -> تصميم -> تطوير -> اطلاق",
      },
      content: {
        intro1: "نساعد المؤسسين على تحويل الافكار الى منتجات وعلامات تجارية.",
        intro2:
          "نحن دانيال ونادين، ثنائي في التسويق والتطوير وراء madeleydesignstudio. نعمل عن قرب مع الفرق التي نؤمن بها.",
        intro3: "تسويق -> تصميم -> تطوير -> اطلاق -> تكرار...",
        intro4:
          "نحب المشاريع التي يتحرك فيها التصميم والكود معا، حتى لا يضيع شيء من الفكرة حتى التنفيذ.",
        intro5:
          "ننجذب الى الافكار الجديدة. ندخل بسرعة ونستكشف بعمق. سواء كنا نشكل افكارا مبكرة، او نحسن منتجات في الانتاج، او نصنع بصريات جريئة للحظات خاصة، نحرص ان يبدو كل شيء متماسكا ومتوافقا مع الهوية.",
        contact1:
          "اذا كنت تشاركنا هذه الرؤية وتبحث عن شريك لدفع منتجك الى الامام، راسلنا على hello@madeleydesignstudio.com",
        contact2: "مقرنا في المملكة المتحدة، ومتاحون للعمل عن بعد.",
      },
    },
  },
} as const

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: detectLanguage(),
    fallbackLng: "en",
    supportedLngs: [...supportedLanguages],
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18n
