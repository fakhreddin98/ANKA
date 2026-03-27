import { adminEmail, hasSupabaseConfig, supabase } from "./supabase-client.js";
import {
  DEFAULT_PAGES,
  PAGE_FILE_MAP,
  findDefaultPage,
  mergeWithDefaultPages,
} from "./pages-data.js";

const logoutButton = document.querySelector("#logout-button");
const pageList = document.querySelector("#page-list");
const blockList = document.querySelector("#block-list");
const savePageButton = document.querySelector("#save-page-button");
const addBlockButton = document.querySelector("#add-block-button");
const newBlockType = document.querySelector("#new-block-type");
const status = document.querySelector("#page-builder-status");
const editorPageTitle = document.querySelector("#editor-page-title");
const pageTitleInput = document.querySelector("#page-title-input");
const pageNavInput = document.querySelector("#page-nav-input");
const pageMetaDescription = document.querySelector("#page-meta-description");
const pagePublished = document.querySelector("#page-published");

let pages = [];
let currentPage = null;
let dragIndex = null;

const setStatus = (message, tone = "") => {
  status.textContent = message;
  status.dataset.state = tone;
};

const clonePage = (page) => JSON.parse(JSON.stringify(page));

const blockItemsToText = (items = []) =>
  items
    .map((item) =>
      typeof item === "string" ? item : `${item.title || ""} | ${item.body || ""}`
    )
    .join("\n");

const parseItems = (value) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.includes("|")) {
        const [title, body] = line.split("|");
        return { title: title.trim(), body: body.trim() };
      }
      return line;
    });

const blockDefaults = (type) => {
  if (type === "hero") {
    return {
      eyebrow: "Ny sektion",
      title: "Ny rubrik",
      body: "Kort beskrivning",
      buttonLabel: "Las mer",
      buttonHref: "contact.html",
      imageUrl: "",
    };
  }

  if (type === "cards") {
    return {
      eyebrow: "",
      title: "Nya kort",
      body: "",
      items: [
        { title: "Kort 1", body: "Beskrivning" },
        { title: "Kort 2", body: "Beskrivning" },
      ],
    };
  }

  if (type === "cta") {
    return {
      eyebrow: "",
      title: "Ny CTA",
      body: "Kort call to action",
      buttonLabel: "Kontakta oss",
      buttonHref: "contact.html",
    };
  }

  if (type === "text") {
    return {
      eyebrow: "",
      title: "Ny textsektion",
      body: "Text",
    };
  }

  return {};
};

const renderPageList = () => {
  pageList.innerHTML = "";

  pages.forEach((page) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "button button-ghost";
    item.textContent = `${page.navLabel} (${PAGE_FILE_MAP[page.slug] ?? page.slug})`;
    item.addEventListener("click", () => {
      currentPage = clonePage(page);
      renderEditor();
    });
    pageList.appendChild(item);
  });
};

const updateCurrentPageMeta = () => {
  if (!currentPage) {
    return;
  }

  currentPage.title = pageTitleInput.value;
  currentPage.navLabel = pageNavInput.value;
  currentPage.metaDescription = pageMetaDescription.value;
  currentPage.published = pagePublished.checked;
};

const renderBlockCard = (block, index) => {
  const card = document.createElement("article");
  card.className = "admin-list-item";
  card.draggable = true;
  card.dataset.index = String(index);

  card.innerHTML = `
    <div class="admin-list-header">
      <div>
        <p class="admin-chip">${block.type}</p>
        <h3>Block ${index + 1}</h3>
      </div>
      <button class="button button-ghost" type="button" data-remove>Ta bort</button>
    </div>
    <div class="admin-form">
      <label class="field">
        <span>Eyebrow</span>
        <input type="text" data-field="eyebrow" value="${block.data.eyebrow || ""}" />
      </label>
      <label class="field">
        <span>Titel</span>
        <input type="text" data-field="title" value="${block.data.title || ""}" />
      </label>
      <label class="field field-full">
        <span>Text</span>
        <textarea rows="3" data-field="body">${block.data.body || ""}</textarea>
      </label>
      <label class="field">
        <span>Knapptext</span>
        <input type="text" data-field="buttonLabel" value="${block.data.buttonLabel || ""}" />
      </label>
      <label class="field">
        <span>Knapplank</span>
        <input type="text" data-field="buttonHref" value="${block.data.buttonHref || ""}" />
      </label>
      <label class="field field-full">
        <span>Bild-URL</span>
        <input type="text" data-field="imageUrl" value="${block.data.imageUrl || ""}" />
      </label>
      <label class="field field-full">
        <span>Items / kort (en rad per item, anvand "Titel | Text" for cards)</span>
        <textarea rows="4" data-field="items">${blockItemsToText(block.data.items || [])}</textarea>
      </label>
    </div>
  `;

  card.addEventListener("dragstart", () => {
    dragIndex = index;
  });

  card.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  card.addEventListener("drop", (event) => {
    event.preventDefault();
    if (dragIndex === null || dragIndex === index) {
      return;
    }

    const [moved] = currentPage.blocks.splice(dragIndex, 1);
    currentPage.blocks.splice(index, 0, moved);
    dragIndex = null;
    renderEditor();
  });

  card.querySelector("[data-remove]").addEventListener("click", () => {
    currentPage.blocks.splice(index, 1);
    renderEditor();
  });

  card.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", () => {
      const field = input.dataset.field;
      currentPage.blocks[index].data[field] =
        field === "items" ? parseItems(input.value) : input.value;
    });
  });

  return card;
};

const renderEditor = () => {
  if (!currentPage) {
    return;
  }

  editorPageTitle.textContent = currentPage.navLabel;
  pageTitleInput.value = currentPage.title || "";
  pageNavInput.value = currentPage.navLabel || "";
  pageMetaDescription.value = currentPage.metaDescription || "";
  pagePublished.checked = Boolean(currentPage.published);

  blockList.innerHTML = "";
  currentPage.blocks.forEach((block, index) => {
    blockList.appendChild(renderBlockCard(block, index));
  });
};

const saveCurrentPage = async () => {
  updateCurrentPageMeta();
  setStatus("Sparar sidan...", "loading");

  const { error } = await supabase.from("site_pages").upsert(currentPage);

  if (error) {
    setStatus("Det gick inte att spara sidan.", "error");
    return;
  }

  const pageIndex = pages.findIndex((page) => page.slug === currentPage.slug);
  pages[pageIndex] = clonePage(currentPage);
  renderPageList();
  setStatus("Sidan ar sparad.", "success");
};

const loadPages = async () => {
  const { data } = await supabase.from("site_pages").select("*").order("slug");
  pages = mergeWithDefaultPages(data || []);
  renderPageList();
  currentPage = clonePage(pages[0] ?? findDefaultPage("services"));
  renderEditor();
};

if (!hasSupabaseConfig) {
  setStatus("Supabase ar inte konfigurerat i config.js.", "error");
} else {
  const { data } = await supabase.auth.getSession();
  if (!data.session || data.session.user.email !== adminEmail) {
    window.location.href = "admin.html";
  } else {
    await loadPages();
  }

  logoutButton.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "admin.html";
  });

  addBlockButton.addEventListener("click", () => {
    if (!currentPage) {
      return;
    }

    currentPage.blocks.push({
      id: `${newBlockType.value}-${Date.now()}`,
      type: newBlockType.value,
      data: blockDefaults(newBlockType.value),
    });
    renderEditor();
  });

  savePageButton.addEventListener("click", async () => {
    await saveCurrentPage();
  });

  [pageTitleInput, pageNavInput, pageMetaDescription, pagePublished].forEach((input) => {
    input.addEventListener("input", updateCurrentPageMeta);
    input.addEventListener("change", updateCurrentPageMeta);
  });
}
