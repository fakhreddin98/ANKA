import {
  adminEmail,
  hasSupabaseConfig,
  storageBucket,
  supabase,
} from "./supabase-client.js";
import { DEFAULT_SITE_CONTENT, normalizeSiteContent } from "./site-content.js";

const configWarning = document.querySelector("#config-warning");
const loginPanel = document.querySelector("#login-panel");
const adminDashboard = document.querySelector("#admin-dashboard");
const loginForm = document.querySelector("#login-form");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginStatus = document.querySelector("#login-status");
const logoutButton = document.querySelector("#logout-button");
const sessionLabel = document.querySelector("#admin-session-label");
const metricJobs = document.querySelector("#metric-jobs");
const metricInquiries = document.querySelector("#metric-inquiries");
const jobsAdminList = document.querySelector("#jobs-admin-list");
const inquiriesAdminList = document.querySelector("#inquiries-admin-list");
const contentForm = document.querySelector("#content-form");
const contentStatus = document.querySelector("#content-status");
const jobForm = document.querySelector("#job-form");
const jobId = document.querySelector("#job-id");
const jobTitle = document.querySelector("#job-title");
const jobCategory = document.querySelector("#job-category");
const jobLocation = document.querySelector("#job-location");
const jobScope = document.querySelector("#job-scope");
const jobSummary = document.querySelector("#job-summary");
const jobTags = document.querySelector("#job-tags");
const jobPublished = document.querySelector("#job-published");
const jobStatus = document.querySelector("#job-status");
const jobSubmitButton = document.querySelector("#job-submit-button");
const resetJobFormButton = document.querySelector("#reset-job-form");
const contentFields = {
  brandTitle: document.querySelector("#content-brand-title"),
  brandSubtitle: document.querySelector("#content-brand-subtitle"),
  footerCompany: document.querySelector("#content-footer-company"),
  footerSummary: document.querySelector("#content-footer-summary"),
  themeAccent: document.querySelector("#theme-accent"),
  themeAccentStrong: document.querySelector("#theme-accent-strong"),
  themeBgStart: document.querySelector("#theme-bg-start"),
  themeBgMid: document.querySelector("#theme-bg-mid"),
  themeBgEnd: document.querySelector("#theme-bg-end"),
  themeGlowLeft: document.querySelector("#theme-glow-left"),
  themeGlowRight: document.querySelector("#theme-glow-right"),
  sectionOrder: document.querySelector("#content-section-order"),
  heroEyebrow: document.querySelector("#content-hero-eyebrow"),
  heroTitle: document.querySelector("#content-hero-title"),
  heroLead: document.querySelector("#content-hero-lead"),
  heroPrimaryLabel: document.querySelector("#content-hero-primary-label"),
  heroPrimaryHref: document.querySelector("#content-hero-primary-href"),
  heroSecondaryLabel: document.querySelector("#content-hero-secondary-label"),
  heroSecondaryHref: document.querySelector("#content-hero-secondary-href"),
  heroPrimaryImage: document.querySelector("#content-hero-primary-image"),
  heroPrimaryCaption: document.querySelector("#content-hero-primary-caption"),
  heroSecondaryImage: document.querySelector("#content-hero-secondary-image"),
  heroSecondaryCaption: document.querySelector("#content-hero-secondary-caption"),
  heroBadgeLabel: document.querySelector("#content-hero-badge-label"),
  heroBadgeText: document.querySelector("#content-hero-badge-text"),
  partnersToggle: document.querySelector("#toggle-partners"),
  partnersEyebrow: document.querySelector("#content-partners-eyebrow"),
  partnersTitle: document.querySelector("#content-partners-title"),
  partnersLead: document.querySelector("#content-partners-lead"),
  partnerAbTitle: document.querySelector("#content-partner-ab-title"),
  partnerAbBody: document.querySelector("#content-partner-ab-body"),
  partnerAbPoints: document.querySelector("#content-partner-ab-points"),
  partnerAbLink: document.querySelector("#content-partner-ab-link"),
  partnerOxtsTitle: document.querySelector("#content-partner-oxts-title"),
  partnerOxtsBody: document.querySelector("#content-partner-oxts-body"),
  partnerOxtsPoints: document.querySelector("#content-partner-oxts-points"),
  partnerOxtsLink: document.querySelector("#content-partner-oxts-link"),
  offerEyebrow: document.querySelector("#content-offer-eyebrow"),
  offerTitle: document.querySelector("#content-offer-title"),
  offerLead: document.querySelector("#content-offer-lead"),
  offerCard1Title: document.querySelector("#content-offer-card-1-title"),
  offerCard1Body: document.querySelector("#content-offer-card-1-body"),
  offerCard2Title: document.querySelector("#content-offer-card-2-title"),
  offerCard2Body: document.querySelector("#content-offer-card-2-body"),
  offerCard3Title: document.querySelector("#content-offer-card-3-title"),
  offerCard3Body: document.querySelector("#content-offer-card-3-body"),
  jobsToggle: document.querySelector("#toggle-jobs"),
  jobsEyebrow: document.querySelector("#content-jobs-eyebrow"),
  jobsTitle: document.querySelector("#content-jobs-title"),
  jobsLead: document.querySelector("#content-jobs-lead"),
  jobsEmptyLabel: document.querySelector("#content-jobs-empty-label"),
  jobsEmptyTitle: document.querySelector("#content-jobs-empty-title"),
  jobsEmptyBody: document.querySelector("#content-jobs-empty-body"),
  contactToggle: document.querySelector("#toggle-contact"),
  contactEyebrow: document.querySelector("#content-contact-eyebrow"),
  contactTitle: document.querySelector("#content-contact-title"),
  contactLead: document.querySelector("#content-contact-lead"),
  contactPanelLabel: document.querySelector("#content-contact-panel-label"),
  contactPanelTitle: document.querySelector("#content-contact-panel-title"),
  contactPanelItems: document.querySelector("#content-contact-panel-items"),
  contactNoteLabel: document.querySelector("#content-contact-note-label"),
  contactNoteText: document.querySelector("#content-contact-note-text"),
};

const setStatus = (target, message, tone = "") => {
  if (!target) {
    return;
  }

  target.textContent = message;
  target.dataset.state = tone;
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const resetJobForm = () => {
  jobForm.reset();
  jobId.value = "";
  jobSubmitButton.textContent = "Spara uppdrag";
  setStatus(jobStatus, "");
};

const parseTags = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const parseLines = (value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const toMultiline = (items = []) => items.join("\n");
const validSectionIds = ["partners", "uppdrag", "kontakt"];
const sanitizeSectionOrder = (value) => {
  const parsed = parseLines(value).filter((item) => validSectionIds.includes(item));
  return parsed.length ? parsed : validSectionIds;
};

const fillContentForm = (row) => {
  const content = normalizeSiteContent(row);

  contentFields.brandTitle.value = content.brand.title;
  contentFields.brandSubtitle.value = content.brand.subtitle;
  contentFields.footerCompany.value = content.brand.footerCompany;
  contentFields.footerSummary.value = content.brand.footerSummary;
  contentFields.themeAccent.value = content.theme.accent;
  contentFields.themeAccentStrong.value = content.theme.accentStrong;
  contentFields.themeBgStart.value = content.theme.bgStart;
  contentFields.themeBgMid.value = content.theme.bgMid;
  contentFields.themeBgEnd.value = content.theme.bgEnd;
  contentFields.themeGlowLeft.value = content.theme.glowLeft;
  contentFields.themeGlowRight.value = content.theme.glowRight;
  contentFields.sectionOrder.value = toMultiline(content.layout.managedSectionOrder);

  contentFields.heroEyebrow.value = content.hero.eyebrow;
  contentFields.heroTitle.value = content.hero.title;
  contentFields.heroLead.value = content.hero.lead;
  contentFields.heroPrimaryLabel.value = content.hero.primaryCtaLabel;
  contentFields.heroPrimaryHref.value = content.hero.primaryCtaHref;
  contentFields.heroSecondaryLabel.value = content.hero.secondaryCtaLabel;
  contentFields.heroSecondaryHref.value = content.hero.secondaryCtaHref;
  contentFields.heroPrimaryImage.value = content.hero.primaryImageUrl;
  contentFields.heroPrimaryCaption.value = content.hero.primaryImageCaption;
  contentFields.heroSecondaryImage.value = content.hero.secondaryImageUrl;
  contentFields.heroSecondaryCaption.value = content.hero.secondaryImageCaption;
  contentFields.heroBadgeLabel.value = content.hero.badgeLabel;
  contentFields.heroBadgeText.value = content.hero.badgeText;

  contentFields.partnersToggle.checked = Boolean(content.visibility.partners);
  contentFields.partnersEyebrow.value = content.partners.eyebrow;
  contentFields.partnersTitle.value = content.partners.title;
  contentFields.partnersLead.value = content.partners.lead;
  contentFields.partnerAbTitle.value = content.partners.abdynamicsTitle;
  contentFields.partnerAbBody.value = content.partners.abdynamicsBody;
  contentFields.partnerAbPoints.value = toMultiline(content.partners.abdynamicsPoints);
  contentFields.partnerAbLink.value = content.partners.abdynamicsLink;
  contentFields.partnerOxtsTitle.value = content.partners.oxtsTitle;
  contentFields.partnerOxtsBody.value = content.partners.oxtsBody;
  contentFields.partnerOxtsPoints.value = toMultiline(content.partners.oxtsPoints);
  contentFields.partnerOxtsLink.value = content.partners.oxtsLink;

  contentFields.offerEyebrow.value = content.offer.eyebrow;
  contentFields.offerTitle.value = content.offer.title;
  contentFields.offerLead.value = content.offer.lead;
  contentFields.offerCard1Title.value = content.offer.cards[0].title;
  contentFields.offerCard1Body.value = content.offer.cards[0].body;
  contentFields.offerCard2Title.value = content.offer.cards[1].title;
  contentFields.offerCard2Body.value = content.offer.cards[1].body;
  contentFields.offerCard3Title.value = content.offer.cards[2].title;
  contentFields.offerCard3Body.value = content.offer.cards[2].body;

  contentFields.jobsToggle.checked = Boolean(content.visibility.jobs);
  contentFields.jobsEyebrow.value = content.jobs.eyebrow;
  contentFields.jobsTitle.value = content.jobs.title;
  contentFields.jobsLead.value = content.jobs.lead;
  contentFields.jobsEmptyLabel.value = content.jobs.emptyLabel;
  contentFields.jobsEmptyTitle.value = content.jobs.emptyTitle;
  contentFields.jobsEmptyBody.value = content.jobs.emptyBody;

  contentFields.contactToggle.checked = Boolean(content.visibility.contact);
  contentFields.contactEyebrow.value = content.contact.eyebrow;
  contentFields.contactTitle.value = content.contact.title;
  contentFields.contactLead.value = content.contact.lead;
  contentFields.contactPanelLabel.value = content.contact.panelLabel;
  contentFields.contactPanelTitle.value = content.contact.panelTitle;
  contentFields.contactPanelItems.value = toMultiline(content.contact.panelItems);
  contentFields.contactNoteLabel.value = content.contact.noteLabel;
  contentFields.contactNoteText.value = content.contact.noteText;
};

const collectContentPayload = () => ({
  id: 1,
  brand: {
    title: contentFields.brandTitle.value,
    subtitle: contentFields.brandSubtitle.value,
    footerCompany: contentFields.footerCompany.value,
    footerSummary: contentFields.footerSummary.value,
  },
  theme: {
    accent: contentFields.themeAccent.value,
    accentStrong: contentFields.themeAccentStrong.value,
    bgStart: contentFields.themeBgStart.value,
    bgMid: contentFields.themeBgMid.value,
    bgEnd: contentFields.themeBgEnd.value,
    glowLeft: contentFields.themeGlowLeft.value,
    glowRight: contentFields.themeGlowRight.value,
  },
  layout: {
    managedSectionOrder: sanitizeSectionOrder(contentFields.sectionOrder.value),
  },
  hero: {
    eyebrow: contentFields.heroEyebrow.value,
    title: contentFields.heroTitle.value,
    lead: contentFields.heroLead.value,
    primaryCtaLabel: contentFields.heroPrimaryLabel.value,
    primaryCtaHref: contentFields.heroPrimaryHref.value,
    secondaryCtaLabel: contentFields.heroSecondaryLabel.value,
    secondaryCtaHref: contentFields.heroSecondaryHref.value,
    primaryImageUrl: contentFields.heroPrimaryImage.value,
    primaryImageCaption: contentFields.heroPrimaryCaption.value,
    secondaryImageUrl: contentFields.heroSecondaryImage.value,
    secondaryImageCaption: contentFields.heroSecondaryCaption.value,
    badgeLabel: contentFields.heroBadgeLabel.value,
    badgeText: contentFields.heroBadgeText.value,
  },
  partners: {
    eyebrow: contentFields.partnersEyebrow.value,
    title: contentFields.partnersTitle.value,
    lead: contentFields.partnersLead.value,
    abdynamicsTitle: contentFields.partnerAbTitle.value,
    abdynamicsBody: contentFields.partnerAbBody.value,
    abdynamicsPoints: parseLines(contentFields.partnerAbPoints.value),
    abdynamicsLink: contentFields.partnerAbLink.value,
    oxtsTitle: contentFields.partnerOxtsTitle.value,
    oxtsBody: contentFields.partnerOxtsBody.value,
    oxtsPoints: parseLines(contentFields.partnerOxtsPoints.value),
    oxtsLink: contentFields.partnerOxtsLink.value,
  },
  offer: {
    eyebrow: contentFields.offerEyebrow.value,
    title: contentFields.offerTitle.value,
    lead: contentFields.offerLead.value,
    cards: [
      {
        title: contentFields.offerCard1Title.value,
        body: contentFields.offerCard1Body.value,
      },
      {
        title: contentFields.offerCard2Title.value,
        body: contentFields.offerCard2Body.value,
      },
      {
        title: contentFields.offerCard3Title.value,
        body: contentFields.offerCard3Body.value,
      },
    ],
  },
  jobs: {
    eyebrow: contentFields.jobsEyebrow.value,
    title: contentFields.jobsTitle.value,
    lead: contentFields.jobsLead.value,
    emptyLabel: contentFields.jobsEmptyLabel.value,
    emptyTitle: contentFields.jobsEmptyTitle.value,
    emptyBody: contentFields.jobsEmptyBody.value,
  },
  contact: {
    eyebrow: contentFields.contactEyebrow.value,
    title: contentFields.contactTitle.value,
    lead: contentFields.contactLead.value,
    panelLabel: contentFields.contactPanelLabel.value,
    panelTitle: contentFields.contactPanelTitle.value,
    panelItems: parseLines(contentFields.contactPanelItems.value),
    noteLabel: contentFields.contactNoteLabel.value,
    noteText: contentFields.contactNoteText.value,
  },
  visibility: {
    partners: contentFields.partnersToggle.checked,
    jobs: contentFields.jobsToggle.checked,
    contact: contentFields.contactToggle.checked,
  },
});

const renderJobs = (jobs) => {
  jobsAdminList.innerHTML = "";
  metricJobs.textContent = String(jobs.filter((job) => job.published).length);

  if (!jobs.length) {
    jobsAdminList.innerHTML =
      '<div class="admin-list-item"><p>Inga uppdrag finns sparade annu.</p></div>';
    return;
  }

  jobs.forEach((job) => {
    const item = document.createElement("article");
    item.className = "admin-list-item";

    const tagMarkup = (job.tags || [])
      .map((tag) => `<span class="admin-tag">${tag}</span>`)
      .join("");

    item.innerHTML = `
      <div class="admin-list-header">
        <div>
          <p class="admin-chip">${job.published ? "Publicerad" : "Utkast"}</p>
          <h3>${job.title}</h3>
        </div>
        <div class="admin-actions">
          <button class="button button-ghost" type="button" data-action="edit" data-id="${job.id}">Redigera</button>
          <button class="button button-ghost" type="button" data-action="toggle" data-id="${job.id}">
            ${job.published ? "Avpublicera" : "Publicera"}
          </button>
          <button class="button button-ghost" type="button" data-action="delete" data-id="${job.id}">Ta bort</button>
        </div>
      </div>
      <p>${job.summary || ""}</p>
      <div class="admin-tag-row">${tagMarkup}</div>
      <span>Plats: ${job.location || "Ej angivet"}</span>
      <span>Omfattning: ${job.scope || "Ej angivet"}</span>
      <span>Senast uppdaterad: ${formatDate(job.updated_at || job.created_at)}</span>
    `;

    item.querySelector('[data-action="edit"]').addEventListener("click", () => {
      jobId.value = job.id;
      jobTitle.value = job.title ?? "";
      jobCategory.value = job.category ?? "";
      jobLocation.value = job.location ?? "";
      jobScope.value = job.scope ?? "";
      jobSummary.value = job.summary ?? "";
      jobTags.value = (job.tags || []).join(", ");
      jobPublished.checked = Boolean(job.published);
      jobSubmitButton.textContent = "Uppdatera uppdrag";
      setStatus(jobStatus, "Redigerar valt uppdrag.", "loading");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    item.querySelector('[data-action="toggle"]').addEventListener("click", async () => {
      const { error } = await supabase
        .from("jobs")
        .update({ published: !job.published })
        .eq("id", job.id);

      if (error) {
        setStatus(jobStatus, "Det gick inte att uppdatera publiceringsstatus.", "error");
        return;
      }

      await loadDashboardData();
    });

    item.querySelector('[data-action="delete"]').addEventListener("click", async () => {
      const confirmed = window.confirm(`Ta bort uppdraget "${job.title}"?`);

      if (!confirmed) {
        return;
      }

      const { error } = await supabase.from("jobs").delete().eq("id", job.id);

      if (error) {
        setStatus(jobStatus, "Det gick inte att ta bort uppdraget.", "error");
        return;
      }

      resetJobForm();
      await loadDashboardData();
    });

    jobsAdminList.appendChild(item);
  });
};

const renderInquiries = (inquiries) => {
  inquiriesAdminList.innerHTML = "";
  metricInquiries.textContent = String(
    inquiries.filter((entry) => entry.status === "new").length
  );

  if (!inquiries.length) {
    inquiriesAdminList.innerHTML =
      '<div class="admin-list-item"><p>Inga formular ar mottagna annu.</p></div>';
    return;
  }

  inquiries.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "admin-list-item";

    item.innerHTML = `
      <div class="admin-list-header">
        <div>
          <p class="admin-chip">${entry.role}</p>
          <h3>${entry.name}</h3>
        </div>
        <select class="admin-select" data-status-id="${entry.id}">
          <option value="new">Ny</option>
          <option value="contacted">Kontaktad</option>
          <option value="closed">Stangd</option>
        </select>
      </div>
      <span>E-post: ${entry.email}</span>
      <span>Telefon: ${entry.phone}</span>
      <span>Adress: ${entry.address || "Ej angiven"}</span>
      <span>Bolag: ${entry.company || "Ej angivet"}</span>
      <p>${entry.message || ""}</p>
      ${
        entry.signedUrl
          ? `<a class="admin-link" href="${entry.signedUrl}" target="_blank" rel="noreferrer">Oppna bilaga: ${entry.file_name || "Fil"}</a>`
          : ""
      }
      <span>Inskickat: ${formatDate(entry.created_at)}</span>
    `;

    const select = item.querySelector("select");
    select.value = entry.status || "new";
    select.addEventListener("change", async () => {
      const { error } = await supabase
        .from("inquiries")
        .update({ status: select.value })
        .eq("id", entry.id);

      if (error) {
        select.value = entry.status || "new";
        return;
      }

      await loadDashboardData();
    });

    inquiriesAdminList.appendChild(item);
  });
};

const loadDashboardData = async () => {
  const [
    { data: jobs, error: jobsError },
    { data: inquiries, error: inquiriesError },
    { data: siteContent, error: siteContentError },
  ] =
    await Promise.all([
      supabase.from("jobs").select("*").order("created_at", { ascending: false }),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("site_content").select("*").eq("id", 1).maybeSingle(),
    ]);

  if (jobsError) {
    setStatus(jobStatus, "Det gick inte att hamta uppdrag fran databasen.", "error");
    return;
  }

  if (inquiriesError) {
    inquiriesAdminList.innerHTML =
      '<div class="admin-list-item"><p>Det gick inte att hamta formular just nu.</p></div>';
  }

  const inquiryRows = await Promise.all(
    (inquiries || []).map(async (entry) => {
      if (!entry.file_path) {
        return entry;
      }

      const { data } = await supabase.storage
        .from(storageBucket)
        .createSignedUrl(entry.file_path, 60 * 60);

      return {
        ...entry,
        signedUrl: data?.signedUrl ?? null,
      };
    })
  );

  if (siteContentError) {
    setStatus(contentStatus, "Det gick inte att hamta webbplatsinnehall.", "error");
  } else {
    fillContentForm(siteContent ?? DEFAULT_SITE_CONTENT);
  }

  renderJobs(jobs || []);
  renderInquiries(inquiryRows);
};

const showLoggedOut = () => {
  loginPanel.hidden = false;
  adminDashboard.hidden = true;
  logoutButton.hidden = true;
  sessionLabel.textContent = "Ej inloggad";
};

const showLoggedIn = async (session) => {
  loginPanel.hidden = true;
  adminDashboard.hidden = false;
  logoutButton.hidden = false;
  sessionLabel.textContent = session.user.email;
  await loadDashboardData();
};

const verifyAdminSession = async (session) => {
  const email = session?.user?.email;

  if (!email) {
    showLoggedOut();
    return;
  }

  if (email !== adminEmail) {
    await supabase.auth.signOut();
    setStatus(
      loginStatus,
      "Det har kontot ar inte behorigt for adminportalen.",
      "error"
    );
    showLoggedOut();
    return;
  }

  await showLoggedIn(session);
};

if (!hasSupabaseConfig) {
  configWarning.hidden = false;
  loginPanel.hidden = true;
} else {
  loginEmail.value = adminEmail;

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(loginStatus, "Loggar in...", "loading");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail.value,
      password: loginPassword.value,
    });

    if (error) {
      setStatus(loginStatus, "Inloggningen misslyckades.", "error");
      return;
    }

    setStatus(loginStatus, "");
    await verifyAdminSession(data.session);
  });

  logoutButton.addEventListener("click", async () => {
    await supabase.auth.signOut();
  });

  resetJobFormButton.addEventListener("click", () => {
    resetJobForm();
  });

  contentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(contentStatus, "Sparar webbplatsinnehall...", "loading");

    const payload = collectContentPayload();
    const { error } = await supabase.from("site_content").upsert(payload);

    if (error) {
      setStatus(contentStatus, "Det gick inte att spara webbplatsinnehall.", "error");
      return;
    }

    setStatus(contentStatus, "Webbplatsinnehallet ar sparat.", "success");
    await loadDashboardData();
  });

  jobForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(jobStatus, "Sparar uppdrag...", "loading");

    const payload = {
      title: jobTitle.value,
      category: jobCategory.value,
      location: jobLocation.value,
      scope: jobScope.value,
      summary: jobSummary.value,
      tags: parseTags(jobTags.value),
      published: jobPublished.checked,
    };

    const query = jobId.value
      ? supabase.from("jobs").update(payload).eq("id", jobId.value)
      : supabase.from("jobs").insert(payload);

    const { error } = await query;

    if (error) {
      setStatus(jobStatus, "Det gick inte att spara uppdraget.", "error");
      return;
    }

    setStatus(jobStatus, "Uppdraget ar sparat.", "success");
    resetJobForm();
    await loadDashboardData();
  });

  const { data } = await supabase.auth.getSession();
  await verifyAdminSession(data.session);

  supabase.auth.onAuthStateChange(async (_event, session) => {
    await verifyAdminSession(session);
  });
}
