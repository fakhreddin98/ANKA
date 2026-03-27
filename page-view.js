import {
  formSubmitAjaxEndpoint,
  formSubmitEndpoint,
  hasSupabaseConfig,
  storageBucket,
  supabase,
} from "./supabase-client.js";
import {
  DEFAULT_PAGES,
  PAGE_FILE_MAP,
  findDefaultPage,
  mergeWithDefaultPages,
} from "./pages-data-clean.js";

const body = document.body;
const currentSlug = body.dataset.pageSlug;
const pageTitle = document.querySelector("#page-title");
const pageBlocks = document.querySelector("#page-blocks");
const navRoot = document.querySelector("#site-nav");
const metaDescription = document.querySelector('meta[name="description"]');

const createTextElement = (tagName, text, className = "") => {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  element.textContent = text ?? "";
  return element;
};

const mapPageFromDb = (page) => ({
  slug: page.slug,
  title: page.title,
  navLabel: page.navLabel ?? page.nav_label ?? "",
  metaDescription: page.metaDescription ?? page.meta_description ?? "",
  published: Boolean(page.published),
  blocks: Array.isArray(page.blocks) ? page.blocks : [],
});

const buildNav = (pages) => {
  if (!navRoot) {
    return;
  }

  navRoot.innerHTML = "";

  pages
    .filter((page) => page.published)
    .forEach((page) => {
      const link = document.createElement("a");
      link.href = PAGE_FILE_MAP[page.slug] ?? `${page.slug}.html`;
      link.textContent = page.navLabel || page.title;
      if (page.slug === currentSlug) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
      navRoot.appendChild(link);
    });
};

const createSection = (className = "page-section") => {
  const section = document.createElement("section");
  section.className = className;
  return section;
};

const renderTextBlock = (block) => {
  const section = createSection("page-section page-text-block");
  if (block.data.eyebrow) {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = block.data.eyebrow;
    section.appendChild(eyebrow);
  }

  if (block.data.title) {
    const title = document.createElement("h2");
    title.textContent = block.data.title;
    section.appendChild(title);
  }

  if (block.data.body) {
    const bodyText = document.createElement("p");
    bodyText.className = "lead";
    bodyText.textContent = block.data.body;
    section.appendChild(bodyText);
  }

  return section;
};

const renderCtaBlock = (block) => {
  const section = createSection("page-section insight-section");
  const panel = document.createElement("div");
  panel.className = "insight-panel";

  if (block.data.eyebrow) {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = block.data.eyebrow;
    panel.appendChild(eyebrow);
  }

  if (block.data.title) {
    const title = document.createElement("h2");
    title.textContent = block.data.title;
    panel.appendChild(title);
  }

  if (block.data.body) {
    const bodyText = document.createElement("p");
    bodyText.textContent = block.data.body;
    panel.appendChild(bodyText);
  }

  if (block.data.buttonLabel && block.data.buttonHref) {
    const button = document.createElement("a");
    button.className = "button";
    button.href = block.data.buttonHref;
    button.textContent = block.data.buttonLabel;
    panel.appendChild(button);
  }

  section.appendChild(panel);
  return section;
};

const renderHeroBlock = (block) => {
  const section = createSection("page-section page-hero-block");
  const copy = document.createElement("div");
  copy.className = "page-hero-copy";

  if (block.data.eyebrow) {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = block.data.eyebrow;
    copy.appendChild(eyebrow);
  }

  const title = document.createElement("h1");
  title.textContent = block.data.title || "";
  copy.appendChild(title);

  const bodyText = document.createElement("p");
  bodyText.className = "lead";
  bodyText.textContent = block.data.body || "";
  copy.appendChild(bodyText);

  if (block.data.buttonLabel && block.data.buttonHref) {
    const button = document.createElement("a");
    button.className = "button";
    button.href = block.data.buttonHref;
    button.textContent = block.data.buttonLabel;
    copy.appendChild(button);
  }

  section.appendChild(copy);

  if (block.data.imageUrl) {
    const media = document.createElement("div");
    media.className = "hero-media hero-media-large";
    const image = document.createElement("img");
    image.src = block.data.imageUrl;
    image.alt = block.data.title || "Hero image";
    media.appendChild(image);
    section.appendChild(media);
  }

  return section;
};

const renderCardsBlock = (block) => {
  const section = createSection("page-section");
  if (block.data.eyebrow || block.data.title || block.data.body) {
    const heading = document.createElement("div");
    heading.className = "section-heading";

    if (block.data.eyebrow) {
      const eyebrow = document.createElement("p");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = block.data.eyebrow;
      heading.appendChild(eyebrow);
    }

    if (block.data.title) {
      const title = document.createElement("h2");
      title.textContent = block.data.title;
      heading.appendChild(title);
    }

    if (block.data.body) {
      const bodyText = document.createElement("p");
      bodyText.textContent = block.data.body;
      heading.appendChild(bodyText);
    }

    section.appendChild(heading);
  }

  const grid = document.createElement("div");
  const isLogoVariant = block.data.variant === "logos";
  const isMinimalLogoVariant = isLogoVariant && block.data.minimal === true;
  grid.className = isLogoVariant ? "logo-wall" : "capability-grid";

  (block.data.items || []).forEach((item, index) => {
    const normalizedItem =
      typeof item === "string" ? { title: item, body: "" } : item;
    const cardTag = normalizedItem.href ? "a" : "article";
    const card = document.createElement(cardTag);
    card.className = isLogoVariant ? "logo-card" : "capability-card";

    if (normalizedItem.href) {
      card.href = normalizedItem.href;
      card.target = "_blank";
      card.rel = "noreferrer";
    }

    if (isLogoVariant) {
      const mark = document.createElement("div");
      mark.className = "logo-mark";

      const fallback = document.createElement("span");
      fallback.className = "logo-fallback";
      fallback.textContent = normalizedItem.title || "";
      mark.appendChild(fallback);

      if (normalizedItem.imageUrl) {
        const image = document.createElement("img");
        image.src = normalizedItem.imageUrl;
        image.alt = normalizedItem.title || "Logo";
        image.addEventListener("load", () => {
          fallback.hidden = true;
        });
        image.addEventListener("error", () => {
          image.remove();
          fallback.hidden = false;
        });
        mark.appendChild(image);
      }

      card.appendChild(mark);

      if (!isMinimalLogoVariant) {
        const title = document.createElement("h3");
        title.textContent = normalizedItem.title || "";
        card.appendChild(title);

        if (normalizedItem.body) {
          card.appendChild(createTextElement("p", normalizedItem.body));
        }
      }
    } else {
      card.appendChild(
        createTextElement(
          "span",
          String(index + 1).padStart(2, "0"),
          "card-index"
        )
      );
      card.appendChild(createTextElement("h3", normalizedItem.title || ""));
      card.appendChild(createTextElement("p", normalizedItem.body || ""));
    }

    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
};

const renderJobFeedBlock = async () => {
  const section = createSection("page-section");
  const grid = document.createElement("div");
  grid.className = "jobs-grid";

  if (!supabase) {
    section.innerHTML =
      '<article class="jobs-placeholder"><p>Supabase ar inte konfigurerat for den har sidan an.</p></article>';
    return section;
  }

  const { data, error } = await supabase
    .from("jobs")
    .select("title, category, summary, location, scope, tags")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    section.innerHTML =
      '<article class="jobs-placeholder"><p>Inga publicerade uppdrag finns just nu.</p></article>';
    return section;
  }

  data.forEach((job) => {
    const card = document.createElement("article");
    card.className = "job-card";

    card.appendChild(createTextElement("p", job.category || "Uppdrag", "job-type"));
    card.appendChild(createTextElement("h3", job.title || ""));
    card.appendChild(createTextElement("p", job.summary || ""));

    const tagList = document.createElement("ul");
    tagList.className = "tag-list";
    (job.tags || []).forEach((tag) => {
      tagList.appendChild(createTextElement("li", tag));
    });
    card.appendChild(tagList);

    const meta = document.createElement("div");
    meta.className = "job-meta";
    meta.appendChild(
      createTextElement("span", `Plats: ${job.location || "Enligt overenskommelse"}`)
    );
    meta.appendChild(createTextElement("span", job.scope || "Detaljer i dialog"));
    card.appendChild(meta);

    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
};

const createIntakeForm = () => {
  const wrapper = createSection("page-section");
  wrapper.innerHTML = `
    <form class="intake-form standalone-form" id="standalone-intake-form">
      <fieldset class="role-switcher">
        <legend>Jag kontaktar ANKA som</legend>
        <label class="role-option">
          <input type="radio" name="Kontaktroll" value="Uppdragstagare" checked />
          <span>Uppdragstagare</span>
        </label>
        <label class="role-option">
          <input type="radio" name="Kontaktroll" value="Uppdragsgivare" />
          <span>Uppdragsgivare</span>
        </label>
      </fieldset>
      <p class="form-role-hint">Skicka in CV, kontaktuppgifter och en kort presentation av din erfarenhet.</p>
      <div class="form-grid">
        <label class="field">
          <span>Namn</span>
          <input type="text" name="Namn" required />
        </label>
        <label class="field">
          <span>Telefonnummer</span>
          <input type="tel" name="Telefon" required />
        </label>
        <label class="field">
          <span>E-post</span>
          <input type="email" name="Email" required />
        </label>
        <label class="field">
          <span>Adress</span>
          <input type="text" name="Adress" required />
        </label>
        <label class="field field-full">
          <span>Bolag / organisation</span>
          <input type="text" name="Bolag" />
        </label>
        <label class="field field-full">
          <span>Bifoga CV eller underlag</span>
          <input type="file" id="standalone-file" name="Bilaga" accept=".pdf,.doc,.docx" />
        </label>
        <label class="field field-full">
          <span>Meddelande</span>
          <textarea name="Meddelande" rows="6" required></textarea>
        </label>
      </div>
      <label class="consent-row">
        <input type="checkbox" name="Samtycke" required />
        <span>Jag godkanner att ANKA far kontakta mig om min forfragan.</span>
      </label>
      <button class="button" type="submit">Skicka</button>
      <p class="form-status" id="standalone-form-status" aria-live="polite"></p>
    </form>
  `;
  return wrapper;
};

const uploadAttachment = async (file, role) => {
  if (!supabase || !file) {
    return null;
  }

  const filePath = `${role.toLowerCase()}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from(storageBucket)
    .upload(filePath, file, { upsert: false });

  if (error) {
    throw error;
  }

  return filePath;
};

const notifyByEmail = async (formData) => {
  formData.set("_subject", "Ny kontakt fran ANKA Consulting AB");
  formData.set("_template", "table");
  formData.set("_captcha", "false");

  const response = await fetch(formSubmitAjaxEndpoint, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Email request failed with status ${response.status}`);
  }
};

const saveInquiry = async (formData, filePath, fileName) => {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.from("inquiries").insert({
    role: formData.get("Kontaktroll"),
    name: formData.get("Namn"),
    phone: formData.get("Telefon"),
    email: formData.get("Email"),
    address: formData.get("Adress"),
    company: formData.get("Bolag"),
    message: formData.get("Meddelande"),
    consent: Boolean(formData.get("Samtycke")),
    file_name: fileName,
    file_path: filePath,
  });

  if (error) {
    throw error;
  }
};

const wireStandaloneForm = (root) => {
  const form = root.querySelector("#standalone-intake-form");
  if (!form) {
    return;
  }

  form.action = formSubmitEndpoint;
  const status = root.querySelector("#standalone-form-status");
  const fileInput = root.querySelector("#standalone-file");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (status) {
      status.textContent = "Skickar formularet...";
      status.dataset.state = "loading";
    }
    if (submitButton) {
      submitButton.disabled = true;
    }

    const formData = new FormData(form);
    const file = fileInput?.files?.[0];

    try {
      const filePath = file ? await uploadAttachment(file, formData.get("Kontaktroll")) : null;
      await saveInquiry(formData, filePath, file?.name ?? null);
      await notifyByEmail(formData);
      form.reset();
      if (status) {
        status.textContent = "Formuläret är skickat.";
        status.dataset.state = "success";
      }
    } catch (error) {
      console.error(error);
      if (status) {
        status.textContent = "Det gick inte att skicka formuläret.";
        status.dataset.state = "error";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
};

const renderPage = async (page) => {
  if (!pageTitle || !pageBlocks) {
    return;
  }

  pageTitle.textContent = page.title;
  document.title = `ANKA | ${page.navLabel || page.title}`;
  if (metaDescription && page.metaDescription) {
    metaDescription.setAttribute("content", page.metaDescription);
  }
  pageBlocks.innerHTML = "";

  for (const block of page.blocks || []) {
    let element = null;
    if (block.type === "hero") {
      element = renderHeroBlock(block);
    } else if (block.type === "text") {
      element = renderTextBlock(block);
    } else if (block.type === "cards") {
      element = renderCardsBlock(block);
    } else if (block.type === "job-feed") {
      element = await renderJobFeedBlock(block);
    } else if (block.type === "intake-form") {
      element = createIntakeForm();
      wireStandaloneForm(element);
    } else if (block.type === "cta") {
      element = renderCtaBlock(block);
    }

    if (element) {
      pageBlocks.appendChild(element);
    }
  }

  if (!pageBlocks.children.length) {
    const empty = createSection("page-section");
    empty.appendChild(
      createTextElement(
        "p",
        "Innehåll uppdateras just nu. Välj en annan sida i menyn eller återkom strax.",
        "lead"
      )
    );
    pageBlocks.appendChild(empty);
  }
};

const loadPages = async () => {
  if (!supabase) {
    buildNav(DEFAULT_PAGES);
    const fallback = findDefaultPage(currentSlug);
    if (fallback) {
      await renderPage(fallback);
    }
    return;
  }

  const { data } = await supabase
    .from("site_pages")
    .select("*")
    .eq("published", true)
    .order("slug");

  const pages = data?.length
    ? mergeWithDefaultPages(data.map(mapPageFromDb))
    : DEFAULT_PAGES;
  buildNav(pages);

  const page =
    pages.find((item) => item.slug === currentSlug) ?? findDefaultPage(currentSlug);

  if (page) {
    await renderPage(page);
  }
};

loadPages();
