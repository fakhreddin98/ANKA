import {
  adminEmail,
  formSubmitAjaxEndpoint,
  formSubmitEndpoint,
  hasSupabaseConfig,
  storageBucket,
  supabase,
} from "./supabase-client.js";
import { DEFAULT_SITE_CONTENT, normalizeSiteContent } from "./site-content.js";

const roleInputs = document.querySelectorAll('input[name="Kontaktroll"]');
const roleHint = document.querySelector(".form-role-hint");
const attachmentInput = document.querySelector("#attachment-input");
const attachmentLabel = document.querySelector("#attachment-label");
const attachmentHelp = document.querySelector("#attachment-help");
const messageLabel = document.querySelector("#message-label");
const submitLabel = document.querySelector("#submit-label");
const fileName = document.querySelector("#file-name");
const formStatus = document.querySelector("#form-status");
const intakeForm = document.querySelector("#intake-form");
const jobsList = document.querySelector("#public-jobs-list");
const jobsEmptyState = document.querySelector("#jobs-empty-state");
const jobTemplate = document.querySelector("#public-job-template");
const partnersSection = document.querySelector("#partners");
const jobsSection = document.querySelector("#uppdrag");
const contactSection = document.querySelector("#kontakt");
const managedSections = document.querySelector("#managed-sections");
const roleContent = {
  Uppdragstagare: {
    hint: "Skicka in CV, kontaktuppgifter och en kort presentation av din erfarenhet.",
    attachmentLabel: "Bifoga CV",
    attachmentHelp: "PDF, DOC eller DOCX. Max 10 MB.",
    messageLabel: "Personligt meddelande",
    submitLabel: "Skicka intresseanmalan",
    fileRequired: true,
  },
  Uppdragsgivare: {
    hint: "Beskriv uppdrag, teknikmiljo, tidsplan och vilken profil ni vill komma i kontakt med.",
    attachmentLabel: "Bifoga kravprofil eller underlag",
    attachmentHelp: "Valfritt. PDF, DOC eller DOCX. Max 10 MB.",
    messageLabel: "Beskriv uppdrag eller behov",
    submitLabel: "Skicka uppdragsforfragan",
    fileRequired: false,
  },
};

const textTargets = {
  heroEyebrow: document.querySelector("#hero-eyebrow"),
  heroTitle: document.querySelector("#hero-title"),
  heroLead: document.querySelector("#hero-lead"),
  heroPrimaryCta: document.querySelector("#hero-primary-cta"),
  heroSecondaryCta: document.querySelector("#hero-secondary-cta"),
  heroPrimaryImage: document.querySelector("#hero-primary-image"),
  heroPrimaryCaption: document.querySelector("#hero-primary-caption"),
  heroSecondaryImage: document.querySelector("#hero-secondary-image"),
  heroSecondaryCaption: document.querySelector("#hero-secondary-caption"),
  heroBadgeLabel: document.querySelector("#hero-badge-label"),
  heroBadgeText: document.querySelector("#hero-badge-text"),
  brandTitle: document.querySelector("#brand-title"),
  brandSubtitle: document.querySelector("#brand-subtitle"),
  footerCompany: document.querySelector("#footer-company"),
  footerSummary: document.querySelector("#footer-summary"),
  partnersEyebrow: document.querySelector("#partners-eyebrow"),
  partnersTitle: document.querySelector("#partners-title"),
  partnersLead: document.querySelector("#partners-lead"),
  partnerAbTitle: document.querySelector("#partner-ab-title"),
  partnerAbBody: document.querySelector("#partner-ab-body"),
  partnerAbPoints: document.querySelector("#partner-ab-points"),
  partnerAbLink: document.querySelector("#partner-ab-link"),
  partnerOxtsTitle: document.querySelector("#partner-oxts-title"),
  partnerOxtsBody: document.querySelector("#partner-oxts-body"),
  partnerOxtsPoints: document.querySelector("#partner-oxts-points"),
  partnerOxtsLink: document.querySelector("#partner-oxts-link"),
  offerEyebrow: document.querySelector("#offer-eyebrow"),
  offerTitle: document.querySelector("#offer-title"),
  offerLead: document.querySelector("#offer-lead"),
  offerCard1Title: document.querySelector("#offer-card-1-title"),
  offerCard1Body: document.querySelector("#offer-card-1-body"),
  offerCard2Title: document.querySelector("#offer-card-2-title"),
  offerCard2Body: document.querySelector("#offer-card-2-body"),
  offerCard3Title: document.querySelector("#offer-card-3-title"),
  offerCard3Body: document.querySelector("#offer-card-3-body"),
  jobsEyebrow: document.querySelector("#jobs-eyebrow"),
  jobsTitle: document.querySelector("#jobs-title"),
  jobsLead: document.querySelector("#jobs-lead"),
  jobsEmptyLabel: document.querySelector("#jobs-empty-label"),
  jobsEmptyTitle: document.querySelector("#jobs-empty-title"),
  jobsEmptyBody: document.querySelector("#jobs-empty-body"),
  contactEyebrow: document.querySelector("#contact-eyebrow"),
  contactTitle: document.querySelector("#contact-title"),
  contactLead: document.querySelector("#contact-lead"),
  contactPanelLabel: document.querySelector("#contact-panel-label"),
  contactPanelTitle: document.querySelector("#contact-panel-title"),
  contactPanelItems: document.querySelector("#contact-panel-items"),
  contactNoteLabel: document.querySelector("#contact-note-label"),
  contactNoteText: document.querySelector("#contact-note-text"),
};

const setFormStatus = (message, tone = "") => {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.dataset.state = tone;
};

const updateRoleContent = (value) => {
  const content = roleContent[value];

  if (
    !content ||
    !roleHint ||
    !attachmentInput ||
    !attachmentLabel ||
    !attachmentHelp ||
    !messageLabel ||
    !submitLabel
  ) {
    return;
  }

  roleHint.textContent = content.hint;
  attachmentLabel.textContent = content.attachmentLabel;
  attachmentHelp.textContent = content.attachmentHelp;
  messageLabel.textContent = content.messageLabel;
  submitLabel.textContent = content.submitLabel;
  attachmentInput.required = content.fileRequired;
};

const toSlug = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const validSectionIds = ["partners", "uppdrag", "kontakt"];

const renderList = (root, items = []) => {
  if (!root) {
    return;
  }

  root.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    root.appendChild(li);
  });
};

const applySiteContent = (content) => {
  const merged = normalizeSiteContent(content);
  const root = document.documentElement;

  root.style.setProperty("--accent", merged.theme.accent);
  root.style.setProperty("--accent-strong", merged.theme.accentStrong);
  root.style.setProperty("--bg-start", merged.theme.bgStart);
  root.style.setProperty("--bg-mid", merged.theme.bgMid);
  root.style.setProperty("--bg-end", merged.theme.bgEnd);
  root.style.setProperty("--glow-left", merged.theme.glowLeft);
  root.style.setProperty("--glow-right", merged.theme.glowRight);

  textTargets.brandTitle.textContent = merged.brand.title;
  textTargets.brandSubtitle.textContent = merged.brand.subtitle;
  textTargets.footerCompany.textContent = merged.brand.footerCompany;
  textTargets.footerSummary.textContent = merged.brand.footerSummary;

  textTargets.heroEyebrow.textContent = merged.hero.eyebrow;
  textTargets.heroTitle.textContent = merged.hero.title;
  textTargets.heroLead.textContent = merged.hero.lead;
  textTargets.heroPrimaryCta.textContent = merged.hero.primaryCtaLabel;
  textTargets.heroPrimaryCta.href = merged.hero.primaryCtaHref;
  textTargets.heroSecondaryCta.textContent = merged.hero.secondaryCtaLabel;
  textTargets.heroSecondaryCta.href = merged.hero.secondaryCtaHref;
  textTargets.heroPrimaryImage.src = merged.hero.primaryImageUrl;
  textTargets.heroPrimaryCaption.textContent = merged.hero.primaryImageCaption;
  textTargets.heroSecondaryImage.src = merged.hero.secondaryImageUrl;
  textTargets.heroSecondaryCaption.textContent = merged.hero.secondaryImageCaption;
  textTargets.heroBadgeLabel.textContent = merged.hero.badgeLabel;
  textTargets.heroBadgeText.textContent = merged.hero.badgeText;

  textTargets.partnersEyebrow.textContent = merged.partners.eyebrow;
  textTargets.partnersTitle.textContent = merged.partners.title;
  textTargets.partnersLead.textContent = merged.partners.lead;
  textTargets.partnerAbTitle.textContent = merged.partners.abdynamicsTitle;
  textTargets.partnerAbBody.textContent = merged.partners.abdynamicsBody;
  renderList(textTargets.partnerAbPoints, merged.partners.abdynamicsPoints);
  textTargets.partnerAbLink.href = merged.partners.abdynamicsLink;
  textTargets.partnerOxtsTitle.textContent = merged.partners.oxtsTitle;
  textTargets.partnerOxtsBody.textContent = merged.partners.oxtsBody;
  renderList(textTargets.partnerOxtsPoints, merged.partners.oxtsPoints);
  textTargets.partnerOxtsLink.href = merged.partners.oxtsLink;

  textTargets.offerEyebrow.textContent = merged.offer.eyebrow;
  textTargets.offerTitle.textContent = merged.offer.title;
  textTargets.offerLead.textContent = merged.offer.lead;
  textTargets.offerCard1Title.textContent = merged.offer.cards[0].title;
  textTargets.offerCard1Body.textContent = merged.offer.cards[0].body;
  textTargets.offerCard2Title.textContent = merged.offer.cards[1].title;
  textTargets.offerCard2Body.textContent = merged.offer.cards[1].body;
  textTargets.offerCard3Title.textContent = merged.offer.cards[2].title;
  textTargets.offerCard3Body.textContent = merged.offer.cards[2].body;

  textTargets.jobsEyebrow.textContent = merged.jobs.eyebrow;
  textTargets.jobsTitle.textContent = merged.jobs.title;
  textTargets.jobsLead.textContent = merged.jobs.lead;
  textTargets.jobsEmptyLabel.textContent = merged.jobs.emptyLabel;
  textTargets.jobsEmptyTitle.textContent = merged.jobs.emptyTitle;
  textTargets.jobsEmptyBody.textContent = merged.jobs.emptyBody;

  textTargets.contactEyebrow.textContent = merged.contact.eyebrow;
  textTargets.contactTitle.textContent = merged.contact.title;
  textTargets.contactLead.textContent = merged.contact.lead;
  textTargets.contactPanelLabel.textContent = merged.contact.panelLabel;
  textTargets.contactPanelTitle.textContent = merged.contact.panelTitle;
  renderList(textTargets.contactPanelItems, merged.contact.panelItems);
  textTargets.contactNoteLabel.textContent = merged.contact.noteLabel;
  textTargets.contactNoteText.textContent = merged.contact.noteText;

  partnersSection.hidden = !merged.visibility.partners;
  jobsSection.hidden = !merged.visibility.jobs;
  contactSection.hidden = !merged.visibility.contact;

  if (managedSections) {
    const sectionsById = {
      partners: partnersSection,
      uppdrag: jobsSection,
      kontakt: contactSection,
    };

    const sectionOrder = (merged.layout.managedSectionOrder || []).filter((sectionId) =>
      validSectionIds.includes(sectionId)
    );

    (sectionOrder.length ? sectionOrder : validSectionIds).forEach((sectionId) => {
      const section = sectionsById[sectionId];

      if (section) {
        managedSections.appendChild(section);
      }
    });
  }
};

const notifyByEmail = async (formData) => {
  formData.set("_subject", "Ny kontakt fran ANKA Consulting AB");
  formData.set("_template", "table");
  formData.set("_captcha", "false");

  const senderEmail = formData.get("Email");

  if (senderEmail) {
    formData.set("_replyto", senderEmail);
  }

  const response = await fetch(formSubmitAjaxEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Email request failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (payload.success !== true && payload.success !== "true") {
    throw new Error("FormSubmit did not confirm the email request");
  }
};

const uploadAttachment = async (file, role) => {
  if (!supabase || !file) {
    return null;
  }

  const filePath = `${role.toLowerCase()}/${Date.now()}-${toSlug(file.name)}`;
  const { error } = await supabase.storage
    .from(storageBucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return filePath;
};

const saveInquiry = async (formData, filePath) => {
  if (!supabase) {
    return;
  }

  const payload = {
    role: formData.get("Kontaktroll"),
    name: formData.get("Namn"),
    phone: formData.get("Telefon"),
    email: formData.get("Email"),
    address: formData.get("Adress"),
    company: formData.get("Bolag"),
    message: formData.get("Meddelande"),
    consent: Boolean(formData.get("Samtycke")),
    file_name: attachmentInput?.files?.[0]?.name ?? null,
    file_path: filePath,
  };

  const { error } = await supabase.from("inquiries").insert(payload);

  if (error) {
    throw error;
  }
};

const renderJobs = (jobs) => {
  if (!jobsList || !jobTemplate) {
    return;
  }

  jobsList.innerHTML = "";

  if (!jobs.length) {
    jobsList.hidden = true;
    if (jobsEmptyState) {
      jobsEmptyState.hidden = false;
    }
    return;
  }

  jobs.forEach((job) => {
    const fragment = jobTemplate.content.cloneNode(true);

    fragment.querySelector("[data-job-type]").textContent =
      job.category || "Publicerat uppdrag";
    fragment.querySelector("[data-job-title]").textContent = job.title;
    fragment.querySelector("[data-job-summary]").textContent =
      job.summary || "";
    fragment.querySelector("[data-job-location]").textContent =
      `Plats: ${job.location || "Enligt overenskommelse"}`;
    fragment.querySelector("[data-job-meta]").textContent =
      job.scope || "Detaljer i dialog";

    const tagsRoot = fragment.querySelector("[data-job-tags]");
    (job.tags || []).forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      tagsRoot.appendChild(item);
    });

    jobsList.appendChild(fragment);
  });

  jobsList.hidden = false;
  if (jobsEmptyState) {
    jobsEmptyState.hidden = true;
  }
};

const loadPublishedJobs = async () => {
  if (!supabase || !jobsList) {
    return;
  }

  const { data, error } = await supabase
    .from("jobs")
    .select("title, category, summary, location, scope, tags")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load jobs", error);
    return;
  }

  renderJobs(data ?? []);
};

const loadSiteContent = async () => {
  applySiteContent(DEFAULT_SITE_CONTENT);

  if (!supabase) {
    return;
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Failed to load site content", error);
    return;
  }

  applySiteContent(data);
};

roleInputs.forEach((input) => {
  input.addEventListener("change", () => {
    updateRoleContent(input.value);
  });

  if (input.checked) {
    updateRoleContent(input.value);
  }
});

if (attachmentInput) {
  attachmentInput.addEventListener("change", () => {
    const selectedFile = attachmentInput.files[0];
    fileName.textContent = selectedFile ? selectedFile.name : "Ingen fil vald";
  });
}

if (intakeForm) {
  intakeForm.action = formSubmitEndpoint;
  const emailField = intakeForm.querySelector('input[name="Email"]');
  if (emailField) {
    emailField.setAttribute("value", "");
  }

  intakeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(intakeForm);
    const selectedFile = attachmentInput?.files?.[0] ?? null;

    setFormStatus("Skickar formularet...", "loading");
    submitLabel.disabled = true;

    try {
      let filePath = null;

      if (hasSupabaseConfig && selectedFile) {
        filePath = await uploadAttachment(selectedFile, formData.get("Kontaktroll"));
      }

      if (hasSupabaseConfig) {
        await saveInquiry(formData, filePath);
      }

      await notifyByEmail(formData);

      intakeForm.reset();
      updateRoleContent("Uppdragstagare");
      fileName.textContent = "Ingen fil vald";
      setFormStatus(
        hasSupabaseConfig
          ? "Tack. Din information ar sparad och ett mejl skickas till ANKA."
          : "Tack. Ditt formular skickas via mejl. Koppla Supabase for adminoversikt.",
        "success"
      );
    } catch (error) {
      console.error(error);
      setFormStatus(
        "Det gick inte att skicka formularet. Kontrollera konfigurationen och forsok igen.",
        "error"
      );
    } finally {
      submitLabel.disabled = false;
    }
  });
}

loadPublishedJobs();
loadSiteContent();
