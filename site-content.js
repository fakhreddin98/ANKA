export const DEFAULT_SITE_CONTENT = {
  brand: {
    title: "ANKA",
    subtitle: "Consulting AB",
    footerCompany: "ANKA Consulting AB",
    footerSummary:
      "Uppdrag, partnerforsaljning och produktnara leveranser inom automation och ADAS.",
  },
  theme: {
    accent: "#ff8c42",
    accentStrong: "#ffb071",
    bgStart: "#05080e",
    bgMid: "#0a0f16",
    bgEnd: "#060a10",
    glowLeft: "#1478b8",
    glowRight: "#c85a17",
  },
  layout: {
    managedSectionOrder: ["partners", "uppdrag", "kontakt"],
  },
  hero: {
    eyebrow: "Automation, ADAS och fordonsverifiering",
    title:
      "En morkare, tydligare plattform for konsultuppdrag, testteknik och starkare partnererbjudande.",
    lead:
      "ANKA Consulting AB samlar uppdragstagare, uppdragsgivare och produktspar i samma digitala upplevelse. Har kan ni visa konsultbehov, presentera er teknikprofil och ta emot CV, kontaktuppgifter och forfrågningar direkt.",
    primaryCtaLabel: "Lamna intresseanmalan",
    primaryCtaHref: "#kontakt",
    secondaryCtaLabel: "Se partneromradet",
    secondaryCtaHref: "#partners",
    primaryImageUrl:
      "https://www.abdynamics.com/app/uploads/2024/01/About-AB-Dynamics.jpg",
    primaryImageCaption: "Bildmiljo fran AB Dynamics testekosystem.",
    secondaryImageUrl:
      "https://www.oxts.com/wp-content/uploads/2025/08/Home-page-hero-600x0-c-default.png",
    secondaryImageCaption: "Precision positioning och GNSS/INS fran OXTS.",
    badgeLabel: "Aterforsaljare",
    badgeText: "AB Dynamics + OXTS",
  },
  partners: {
    eyebrow: "Partners och aterforsaljning",
    title: "En kommersiell yta som visar vilka system ANKA kan representera.",
    lead:
      "Sidan lyfter ANKA Consulting AB som partner och aterforsaljare inom fordonsprovning, ADAS och precisionspositionering.",
    abdynamicsTitle:
      "Track testing, ADAS targets, plattformar och driving robots.",
    abdynamicsBody:
      "Positionera ANKA som kontaktpunkt for kunder som vill ha losningar for sparbar, repeterbar och effektiv fordonsprovning.",
    abdynamicsPoints: [
      "ADAS targets och plattformar",
      "Driving robots och telemetri",
      "Test- och verifieringsfloden pa bana och i labb",
    ],
    abdynamicsLink: "https://www.abdynamics.com/",
    oxtsTitle: "Precision positioning och GNSS/INS for ADAS och autonomi.",
    oxtsBody:
      "Har kan ANKA beskriva erbjudandet inom lokalisation, matning, analys och robust data fran komplexa testmiljoer.",
    oxtsPoints: [
      "Centimeternoggrann positionering",
      "GNSS-denied och urbana miljoer",
      "Kalibrering, support och integrationsradgivning",
    ],
    oxtsLink: "https://www.oxts.com/",
  },
  offer: {
    eyebrow: "Erbjudande",
    title: "Fokuserat erbjudande for test, matning och teknisk leverans.",
    lead:
      "ANKA Consulting AB ska kommunicera de omraden som verkligen betyder nagot: ADAS-testning, automation, GNSS/INS, fordonsverifiering och partnerlosningar for avancerade testmiljoer.",
    cards: [
      {
        title: "Konsultleverans",
        body:
          "Specialiserad kompetens inom ADAS, testautomation, verifiering, matsystem och tekniska utvecklingsprojekt.",
      },
      {
        title: "Partnerprodukter",
        body:
          "Losningar fran AB Dynamics och OXTS for sparbar provning, precisionspositionering och robust testdata.",
      },
      {
        title: "Teknisk forstaelse",
        body:
          "Tydlig position inom fordonsprovning, testsystem, scenariohantering och kvalitetsarbete i komplexa miljoer.",
      },
    ],
  },
  jobs: {
    eyebrow: "Uppdrag",
    title: "Uppdrag publiceras via adminportalen.",
    lead:
      "Den publika sidan visar endast verkliga uppdrag. Nar adminportalen ar pa plats kan nya uppdrag laggas till, uppdateras och avpubliceras darifran.",
    emptyLabel: "Ingen publik lista just nu",
    emptyTitle:
      "Verkliga uppdrag publiceras nar de ar godkanda for annonsering.",
    emptyBody:
      "Under tiden kan kandidater och uppdragsgivare skicka in sin information via formularet nedan.",
  },
  contact: {
    eyebrow: "Kontakt och intake",
    title:
      "Ett formular som fungerar for bade uppdragstagare och uppdragsgivare.",
    lead:
      "Besokaren valjer roll och fyller i sina uppgifter. For uppdragstagare ligger fokus pa CV och tillganglighet. For uppdragsgivare ligger fokus pa uppdragsbeskrivning och behov.",
    panelLabel: "Vad ni far in",
    panelTitle: "Strukturerad information som gar att folja upp direkt.",
    panelItems: [
      "Rollval: uppdragstagare eller uppdragsgivare",
      "Namn, telefon, e-post, adress och bolagsnamn",
      "CV eller underlag som filbilaga",
      "Personligt meddelande eller uppdragsbrief",
    ],
    noteLabel: "Mottagning",
    noteText:
      "Formularet ar kopplat for e-postleverans via en extern formulartjanst. Samma underlag kan ocksa sparas i adminportalen via Supabase.",
  },
  visibility: {
    partners: true,
    jobs: true,
    contact: true,
  },
};

const mergeSection = (defaults, incoming) => {
  if (Array.isArray(defaults)) {
    return Array.isArray(incoming) && incoming.length ? incoming : defaults;
  }

  if (typeof defaults !== "object" || defaults === null) {
    return incoming ?? defaults;
  }

  const output = { ...defaults };

  Object.keys(defaults).forEach((key) => {
    output[key] = mergeSection(defaults[key], incoming?.[key]);
  });

  return output;
};

export const normalizeSiteContent = (row) => ({
  brand: mergeSection(DEFAULT_SITE_CONTENT.brand, row?.brand),
  theme: mergeSection(DEFAULT_SITE_CONTENT.theme, row?.theme),
  layout: mergeSection(DEFAULT_SITE_CONTENT.layout, row?.layout),
  hero: mergeSection(DEFAULT_SITE_CONTENT.hero, row?.hero),
  partners: mergeSection(DEFAULT_SITE_CONTENT.partners, row?.partners),
  offer: mergeSection(DEFAULT_SITE_CONTENT.offer, row?.offer),
  jobs: mergeSection(DEFAULT_SITE_CONTENT.jobs, row?.jobs),
  contact: mergeSection(DEFAULT_SITE_CONTENT.contact, row?.contact),
  visibility: mergeSection(DEFAULT_SITE_CONTENT.visibility, row?.visibility),
});
