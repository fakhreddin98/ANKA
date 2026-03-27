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
          eyebrow: "Automation, ADAS och testsystem",
          title: "Teknisk leverans och partnerlosningar for moderna testmiljoer.",
          body: "ANKA Consulting AB samlar konsultleverans, partnerprodukter och verifieringskompetens i en tydligare webbstruktur med separata sidor for varje amne.",
          buttonLabel: "Se tjanster",
          buttonHref: "services.html",
          imageUrl:
            "https://www.abdynamics.com/app/uploads/2024/01/About-AB-Dynamics.jpg",
        },
      },
      {
        id: "home-focus",
        type: "cards",
        data: {
          eyebrow: "Fokus",
          title: "Det viktigaste, utan utfyllnad.",
          body: "Startsidan ska snabbt visa vad ANKA gor och sedan leda vidare till ratt sida.",
          items: [
            {
              title: "Tjanster",
              body: "Automation, ADAS, teststrategi, GNSS/INS och verifiering.",
            },
            {
              title: "Partners",
              body: "AB Dynamics och OXTS for robust testning och matdata.",
            },
            {
              title: "Uppdrag och kontakt",
              body: "Publicerade uppdrag samt intake-flode for kandidater och uppdragsgivare.",
            },
          ],
        },
      },
      {
        id: "home-cta",
        type: "cta",
        data: {
          eyebrow: "Nasta steg",
          title: "Ga vidare till ratt arbetsyta.",
          body: "Tjanster, partners, uppdrag och kontakt ligger nu pa egna sidor. Sidinnehall byggs i admin med block som kan flyttas med drag and drop.",
          buttonLabel: "Oppna kontakt",
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
          title: "Teknisk leverans inom automation, ADAS och testsystem.",
          body: "ANKA Consulting AB fokuserar pa konsultleverans, testmetodik, matsystem och fordonsverifiering i kravande miljoer.",
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
          eyebrow: "Fokus",
          title: "Det viktigaste, tydligt paketerat.",
          body: "Varje sida ska bara visa det som ar relevant for just det amnet.",
          items: [
            {
              title: "ADAS och validering",
              body: "Sensorvalidering, scenariobaserad provning och sparbar analys.",
            },
            {
              title: "Testautomation",
              body: "Bygg och stabilisera testkedjor, CI-floden och kvalitetskontroller.",
            },
            {
              title: "GNSS / INS",
              body: "Precision positioning, matdata och tekniskt stod for avancerad testning.",
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
          title: "Losningar fran AB Dynamics och OXTS.",
          body: "ANKA kan presentera partnerlosningar for sparbar provning, precisionspositionering och effektiv testning i avancerade fordonsmiljoer.",
        },
      },
      {
        id: "partners-cards",
        type: "cards",
        data: {
          items: [
            {
              title: "AB Dynamics",
              body: "Driving robots, ADAS targets, testplattformar och telemetri for repeterbar fordonsprovning.",
            },
            {
              title: "OXTS",
              body: "GNSS/INS, lokalisation och robust matdata for ADAS, autonomi och verifiering.",
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
          title: "Publicerade uppdrag",
          body: "Har visas bara uppdrag som ar publicerade via adminportalen.",
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
          title: "Skicka in underlag eller uppdragsforfragan.",
          body: "Pa den har sidan kan bade uppdragstagare och uppdragsgivare skicka in sin information.",
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
