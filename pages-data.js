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
    metaDescription: "ANKA Consulting AB inom automation, ADAS, test och teknisk leverans.",
    published: true,
    blocks: [
      {
        id: "home-hero",
        type: "hero",
        data: {
          eyebrow: "Engineering services inom ADAS, Euro NCAP och testsystem",
          title: "Produktutveckling, teknisk problemlosning och verifiering for avancerade fordonsmiljoer.",
          body: "ANKA Consulting AB stottar kunder fran behov och teknisk utmaning till verifierad losning. Fokus ligger pa ADAS, Euro NCAP-relaterad provning, testautomation, matdata och robusta testmiljoer.",
          buttonLabel: "Vara tjanster",
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
          title: "Tre tydliga spar i samma leveransmodell.",
          body: "Vi bygger ett erbjudande som ar latt att forsta for bade teknikchefer, inkop och projektledare.",
          items: [
            {
              title: "Produktutveckling",
              body: "Utveckling av testnara produkter, verktyg, plattformar och integrationslosningar for moderna engineeringteam.",
            },
            {
              title: "Problemlosning och expertstod",
              body: "Teknisk analys, felsokning, systemforstaelse och riktade insatser i komplexa miljoer dar kvalitet och takt ar avgorande.",
            },
            {
              title: "Test och verifiering",
              body: "ADAS, Euro NCAP-relevanta floden, HIL, GNSS/INS, automatiserad testning och sparbar datainsamling.",
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
          title: "Aktorer vi arbetar eller har arbetat med.",
          body: "Sektionen ska tydligt visa de partners, testmiljoer och organisationer som ANKA har verklig koppling till genom samarbete, uppdrag eller teknisk dialog.",
          items: [
            {
              title: "AB Dynamics",
              body: "Partner inom testplattformar, driving robots och ADAS-provning.",
              href: "https://www.abdynamics.com/",
              imageUrl: "AB_Dynamics.png",
            },
            {
              title: "OXTS",
              body: "Partner inom GNSS/INS, lokalisation och precisionsmatning.",
              href: "https://www.oxts.com/",
              imageUrl: "OxTS-Master-Full-Colour-Black-1-footer-400x144-c-default.webp",
            },
            {
              title: "RISE",
              body: "Forsknings- och innovationspartner med stark koppling till test och verifiering.",
              href: "https://www.ri.se/",
              imageUrl: "RISE.png",
            },
            {
              title: "AstaZero",
              body: "Testmiljo for aktiv sakerhet, ADAS och automatiserade fordon.",
              href: "https://www.astazero.com/",
              imageUrl: "AZ-LOGO_POS.png",
            },
            {
              title: "Euro NCAP",
              body: "Referensyta for sakerhetskrav, provningsscenarier och ADAS-relevanta testfloden.",
              href: "https://www.euroncap.com/",
              imageUrl: "Euro_NCAP_Logo_Black_da89494d0e.png",
            },
            {
              title: "Hogskolan i Boras",
              body: "Akademisk partner med koppling till teknik, utveckling och kompetensforsorjning.",
              href: "https://www.hb.se/",
              imageUrl: "hb_logo.png",
            },
            {
              title: "ESSIQ",
              body: "Problemlosare inom produktutveckling och teknik.",
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
          eyebrow: "Arbetssatt",
          title: "Fran tekniskt problem till verifierad leverans.",
          body: "Vi arbetar nara kundens verkliga utvecklingsmiljo med kombinationen konsultkompetens, partnerlosningar och produktnara engineering. Resultatet ska vara anvandbart i vardagen, inte bara snyggt pa papper.",
          buttonLabel: "Kontakta oss",
          buttonHref: "contact.html",
        },
      },
    ],
  },
  {
    slug: "services",
    title: "Tjanster",
    navLabel: "Tjanster",
    metaDescription: "ANKA Consulting AB inom automation, ADAS och teknisk leverans.",
    published: true,
    blocks: [
      {
        id: "services-hero",
        type: "hero",
        data: {
          eyebrow: "Tjanster",
          title: "Engineeringtjanster for produktutveckling, verifiering och teknisk problemlosning.",
          body: "Vara tjanster ar byggda for kunder som utvecklar, verifierar och industrialiserar avancerade system inom fordon, ADAS, automation och intelligenta testmiljoer.",
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
          eyebrow: "Tjansteomraden",
          title: "Kompetens som kopplar ihop utveckling, test och verklig anvandning.",
          body: "Vi vill vara tydliga med vad kunder faktiskt kan fa hjalp med.",
          items: [
            {
              title: "Produktutveckling",
              body: "Utveckling av verktyg, delsystem, testplattformar och tekniska losningar som effektiviserar kundens vardag.",
            },
            {
              title: "Test och verifiering",
              body: "ADAS-validering, teststrategi, HIL/SIL, automatiserade floden och kvalitetssakring med sparbara resultat.",
            },
            {
              title: "Teknisk problemlosning",
              body: "Analys, felsokning, integration och expertstod nar system, testmiljo eller dataflode inte beter sig som de ska.",
            },
          ],
        },
      },
      {
        id: "services-focus",
        type: "cards",
        data: {
          eyebrow: "Sarskilda fokusomraden",
          title: "Dar ANKA ska vara som starkast.",
          body: "Innehall och erbjudande ska peka mot de omraden dar bolaget kan bygga verkligt fortroende.",
          items: [
            {
              title: "ADAS och Euro NCAP",
              body: "Stod kring testupplagg, scenarier, matning, analys och verifieringsfloden for assisterade och aktiva sakerhetssystem.",
            },
            {
              title: "Automation och testmiljoer",
              body: "Utveckling och stabilisering av testutrustning, testriggar, loggning, regression och exekveringsfloden.",
            },
            {
              title: "Positionering och matdata",
              body: "GNSS/INS, sensorfusion, datakvalitet och robust sparbarhet for utveckling, provning och validering.",
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
    metaDescription: "Partnerlosningar fran AB Dynamics och OXTS.",
    published: true,
    blocks: [
      {
        id: "partners-text",
        type: "text",
        data: {
          eyebrow: "Partners",
          title: "Partners, organisationer och miljoer vi arbetar eller har arbetat med.",
          body: "ANKA verkar i ett sammanhang dar teknikleverantorer, testanlaggningar, akademi och sakerhetsorganisationer spelar stor roll. Den har sidan ska visa verkliga partnerrelationer och relevanta samarbetsytor.",
        },
      },
      {
        id: "partners-cards",
        type: "cards",
        data: {
          eyebrow: "Partnerportfolj",
          title: "Ratt teknik for ratt testutmaning.",
          body: "Partnerdelen ska visa att ANKA inte bara tillsatter kompetens, utan ocksa kan bygga en starkare testmiljo tillsammans med kunden.",
          items: [
            {
              title: "AB Dynamics",
              body: "Driving robots, ADAS targets, testbanestod och system for repeterbar och kontrollerad fordonsprovning.",
            },
            {
              title: "OXTS",
              body: "GNSS/INS, positionering, lokalisering och robust matdata for ADAS, autonomi och avancerad verifiering.",
            },
            {
              title: "Integrationsstod",
              body: "Val av losning, teknisk dialog, systemanpassning och stod kring hur utrustningen passar in i kundens befintliga testflode.",
            },
          ],
        },
      },
      {
        id: "partners-logos",
        type: "cards",
        data: {
          variant: "logos",
          eyebrow: "Partners och samarbete",
          title: "Logotyper for partners och organisationer med verklig koppling till ANKA.",
          body: "Det har ar inte en inspirationslista, utan bolag och miljoer som ANKA arbetar eller har arbetat med inom test, ADAS, utveckling och verifiering.",
          items: [
            {
              title: "AB Dynamics",
              body: "Partner inom test och verifiering.",
              href: "https://www.abdynamics.com/",
              imageUrl: "AB_Dynamics.png",
            },
            {
              title: "OXTS",
              body: "Partner inom positionering och matdata.",
              href: "https://www.oxts.com/",
              imageUrl: "OxTS-Master-Full-Colour-Black-1-footer-400x144-c-default.webp",
            },
            {
              title: "RISE",
              body: "Forskningsinstitut och testnara samarbetsyta.",
              href: "https://www.ri.se/",
              imageUrl: "RISE.png",
            },
            {
              title: "AstaZero",
              body: "Provning inom aktiv sakerhet och automatiserade fordon.",
              href: "https://www.astazero.com/",
              imageUrl: "AZ-LOGO_POS.png",
            },
            {
              title: "Euro NCAP",
              body: "Sakerhetsorganisation med tydlig koppling till ADAS- och verifieringsarbete.",
              href: "https://www.euroncap.com/",
              imageUrl: "Euro_NCAP_Logo_Black_da89494d0e.png",
            },
            {
              title: "Hogskolan i Boras",
              body: "Akademisk partner i samma innovations- och kompetensekosystem.",
              href: "https://www.hb.se/",
              imageUrl: "hb_logo.png",
            },
            {
              title: "ESSIQ",
              body: "Engineeringprofil inom produktutveckling och problemlosning.",
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
    metaDescription: "Publicerade uppdrag fran ANKA Consulting AB.",
    published: true,
    blocks: [
      {
        id: "jobs-text",
        type: "text",
        data: {
          eyebrow: "Uppdrag",
          title: "Aktuella uppdrag och engineeringbehov.",
          body: "Har visas bara uppdrag som ar publicerade via adminportalen. Inga platshallarjobb och inga generiska annonser.",
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
    metaDescription: "Kontakta ANKA Consulting AB eller skicka in CV och underlag.",
    published: true,
    blocks: [
      {
        id: "contact-text",
        type: "text",
        data: {
          eyebrow: "Kontakt",
          title: "Skicka in underlag, uppdragsforfragan eller dialog om samarbete.",
          body: "Pa den har sidan kan bade uppdragstagare och uppdragsgivare skicka in sin information till ANKA. Formular och bilagor sparas i admin och skickas vidare som mejlnotis.",
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
