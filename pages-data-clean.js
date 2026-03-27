export const PAGE_FILE_MAP = {
  index: "index.html",
  services: "services.html",
  partners: "partners.html",
  jobs: "jobs.html",
  contact: "contact.html",
};

export const DEFAULT_PAGES = [
  {
    slug: "index",
    title: "ANKA Consulting AB",
    navLabel: "Start",
    metaDescription:
      "ANKA Consulting AB inom automation, ADAS, test och teknisk leverans.",
    published: true,
    blocks: [
      {
        id: "home-hero",
        type: "hero",
        data: {
          eyebrow: "Engineering services inom ADAS, Euro NCAP och testsystem",
          title:
            "Produktutveckling, teknisk problemlösning och verifiering för avancerade fordonsmiljöer.",
          body:
            "ANKA Consulting AB stöttar kunder från behov och teknisk utmaning till verifierad lösning. Fokus ligger på ADAS, Euro NCAP-relaterad provning, testautomation, mätdata och robusta testmiljöer.",
          buttonLabel: "Våra tjänster",
          buttonHref: "services.html",
          imageUrl:
            "https://www.abdynamics.com/app/uploads/2024/01/About-AB-Dynamics.jpg",
        },
      },
      {
        id: "home-focus",
        type: "cards",
        data: {
          eyebrow: "Erbjudande",
          title: "Tre tydliga spår i samma leveransmodell.",
          body:
            "Vi bygger ett erbjudande som är lätt att förstå för både teknikchefer, inköp och projektledare.",
          items: [
            {
              title: "Produktutveckling",
              body:
                "Utveckling av testnära produkter, verktyg, plattformar och integrationslösningar för moderna engineeringteam.",
            },
            {
              title: "Problemlösning och expertstöd",
              body:
                "Teknisk analys, felsökning, systemförståelse och riktade insatser i komplexa miljöer där kvalitet och takt är avgörande.",
            },
            {
              title: "Test och verifiering",
              body:
                "ADAS, Euro NCAP-relevanta flöden, HIL, GNSS/INS, automatiserad testning och spårbar datainsamling.",
            },
          ],
        },
      },
      {
        id: "home-logos",
        type: "cards",
        data: {
          variant: "logos",
          eyebrow: "Partners och samarbetsytor",
          title: "Aktörer vi jobbar med.",
          body:
            "Partners, testmiljöer och organisationer som ANKA arbetar med inom utveckling, test och verifiering.",
          items: [
            {
              title: "AB Dynamics",
              body: "Partner inom testplattformar, driving robots och ADAS-provning.",
              href: "https://www.abdynamics.com/",
              imageUrl: "AB_Dynamics.png",
            },
            {
              title: "OXTS",
              body: "Partner inom GNSS/INS, lokalisation och precisionsmätning.",
              href: "https://www.oxts.com/",
              imageUrl: "OxTS-Master-Full-Colour-Black-1-footer-400x144-c-default.webp",
            },
            {
              title: "RISE",
              body:
                "Forsknings- och innovationspartner med stark koppling till test och verifiering.",
              href: "https://www.ri.se/",
              imageUrl: "RISE.png",
            },
            {
              title: "AstaZero",
              body:
                "Testmiljö för aktiv säkerhet, ADAS och automatiserade fordon.",
              href: "https://www.astazero.com/",
              imageUrl: "AZ-LOGO_POS.png",
            },
            {
              title: "Euro NCAP",
              body:
                "Referensyta för säkerhetskrav, provningsscenarier och ADAS-relevanta testflöden.",
              href: "https://www.euroncap.com/",
              imageUrl: "Euro_NCAP_Logo_Black_da89494d0e.png",
            },
            {
              title: "Högskolan i Borås",
              body:
                "Akademisk partner med koppling till teknik, utveckling och kompetensförsörjning.",
              href: "https://www.hb.se/",
              imageUrl: "hb_logo.png",
            },
            {
              title: "ESSIQ",
              body: "Problemlösare inom produktutveckling och teknik.",
              href: "https://essiq.se/",
              imageUrl: "Essiq-Pos-Logo.png",
            },
          ],
        },
      },
      {
        id: "home-cta",
        type: "cta",
        data: {
          eyebrow: "Arbetssätt",
          title: "Från tekniskt problem till verifierad leverans.",
          body:
            "Vi arbetar nära kundens verkliga utvecklingsmiljö med kombinationen konsultkompetens, partnerlösningar och produktnära engineering. Resultatet ska vara användbart i vardagen, inte bara snyggt på papper.",
          buttonLabel: "Kontakta oss",
          buttonHref: "contact.html",
        },
      },
    ],
  },
  {
    slug: "services",
    title: "Tjänster",
    navLabel: "Tjänster",
    metaDescription:
      "ANKA Consulting AB inom automation, ADAS och teknisk leverans.",
    published: true,
    blocks: [
      {
        id: "services-hero",
        type: "hero",
        data: {
          eyebrow: "Tjänster",
          title:
            "Engineeringtjänster för produktutveckling, verifiering och teknisk problemlösning.",
          body:
            "Våra tjänster är byggda för kunder som utvecklar, verifierar och industrialiserar avancerade system inom fordon, ADAS, automation och intelligenta testmiljöer.",
          buttonLabel: "Kontakta oss",
          buttonHref: "contact.html",
          imageUrl:
            "https://www.abdynamics.com/app/uploads/2024/01/About-AB-Dynamics.jpg",
        },
      },
      {
        id: "services-cards",
        type: "cards",
        data: {
          eyebrow: "Tjänsteområden",
          title:
            "Kompetens som kopplar ihop utveckling, test och verklig användning.",
          body: "Vi vill vara tydliga med vad kunder faktiskt kan få hjälp med.",
          items: [
            {
              title: "Produktutveckling",
              body:
                "Utveckling av verktyg, delsystem, testplattformar och tekniska lösningar som effektiviserar kundens vardag.",
            },
            {
              title: "Test och verifiering",
              body:
                "ADAS-validering, teststrategi, HIL/SIL, automatiserade flöden och kvalitetssäkring med spårbara resultat.",
            },
            {
              title: "Teknisk problemlösning",
              body:
                "Analys, felsökning, integration och expertstöd när system, testmiljö eller dataflöde inte beter sig som de ska.",
            },
          ],
        },
      },
      {
        id: "services-focus",
        type: "cards",
        data: {
          eyebrow: "Särskilda fokusområden",
          title: "Där ANKA ska vara som starkast.",
          body:
            "Innehåll och erbjudande ska peka mot de områden där bolaget kan bygga verkligt förtroende.",
          items: [
            {
              title: "ADAS och Euro NCAP",
              body:
                "Stöd kring testupplägg, scenarier, mätning, analys och verifieringsflöden för assisterade och aktiva säkerhetssystem.",
            },
            {
              title: "Automation och testmiljöer",
              body:
                "Utveckling och stabilisering av testutrustning, testriggar, loggning, regression och exekveringsflöden.",
            },
            {
              title: "Positionering och mätdata",
              body:
                "GNSS/INS, sensorfusion, datakvalitet och robust spårbarhet för utveckling, provning och validering.",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "partners",
    title: "Partners",
    navLabel: "Partners",
    metaDescription:
      "Partners och organisationer som ANKA arbetar eller har arbetat med.",
    published: true,
    blocks: [
      {
        id: "partners-text",
        type: "text",
        data: {
          eyebrow: "Partners",
          title: "Våra partners.",
          body:
            "Det här är partners och organisationer som vi arbetar eller har arbetat med.",
        },
      },
      {
        id: "partners-logos",
        type: "cards",
        data: {
          variant: "logos",
          minimal: true,
          eyebrow: "Partners",
          title: "Aktörer vi arbetar eller har arbetat med.",
          body:
            "Partners, testmiljöer och organisationer med verklig koppling till ANKA.",
          items: [
            {
              title: "AB Dynamics",
              body: "",
              href: "https://www.abdynamics.com/",
              imageUrl: "AB_Dynamics.png",
            },
            {
              title: "OXTS",
              body: "",
              href: "https://www.oxts.com/",
              imageUrl: "OxTS-Master-Full-Colour-Black-1-footer-400x144-c-default.webp",
            },
            {
              title: "RISE",
              body: "",
              href: "https://www.ri.se/",
              imageUrl: "RISE.png",
            },
            {
              title: "AstaZero",
              body: "",
              href: "https://www.astazero.com/",
              imageUrl: "AZ-LOGO_POS.png",
            },
            {
              title: "Euro NCAP",
              body: "",
              href: "https://www.euroncap.com/",
              imageUrl: "Euro_NCAP_Logo_Black_da89494d0e.png",
            },
            {
              title: "Högskolan i Borås",
              body: "",
              href: "https://www.hb.se/",
              imageUrl: "hb_logo.png",
            },
            {
              title: "ESSIQ",
              body: "",
              href: "https://essiq.se/",
              imageUrl: "Essiq-Pos-Logo.png",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "jobs",
    title: "Uppdrag",
    navLabel: "Uppdrag",
    metaDescription: "Publicerade uppdrag från ANKA Consulting AB.",
    published: true,
    blocks: [
      {
        id: "jobs-text",
        type: "text",
        data: {
          eyebrow: "Uppdrag",
          title: "Aktuella uppdrag och engineeringbehov.",
          body:
            "Här visas bara uppdrag som är publicerade via adminportalen. Inga platshållarjobb och inga generiska annonser.",
        },
      },
      {
        id: "jobs-feed",
        type: "job-feed",
        data: {},
      },
    ],
  },
  {
    slug: "contact",
    title: "Kontakt",
    navLabel: "Kontakt",
    metaDescription:
      "Kontakta ANKA Consulting AB eller skicka in CV och underlag.",
    published: true,
    blocks: [
      {
        id: "contact-text",
        type: "text",
        data: {
          eyebrow: "Kontakt",
          title: "Skicka in underlag, uppdragsförfrågan eller dialog om samarbete.",
          body:
            "På den här sidan kan både uppdragstagare och uppdragsgivare skicka in sin information till ANKA. Formulär och bilagor sparas i admin och skickas vidare som mejlnotis.",
        },
      },
      {
        id: "contact-form",
        type: "intake-form",
        data: {},
      },
    ],
  },
];

export const findDefaultPage = (slug) =>
  DEFAULT_PAGES.find((page) => page.slug === slug) ?? null;

export const mergeWithDefaultPages = (dbPages = []) =>
  DEFAULT_PAGES.map((defaultPage) => {
    const dbPage = dbPages.find((page) => page.slug === defaultPage.slug);
    return dbPage
      ? {
          ...defaultPage,
          ...dbPage,
          blocks: Array.isArray(dbPage.blocks) ? dbPage.blocks : defaultPage.blocks,
        }
      : JSON.parse(JSON.stringify(defaultPage));
  });
