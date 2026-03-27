import {
  attachLogout,
  formatDate,
  parseTags,
  requireAdmin,
  setStatus,
  supabase,
} from "./admin-common.js";

const logoutButton = document.querySelector("#logout-button");
const jobsAdminList = document.querySelector("#jobs-admin-list");
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

const resetJobForm = () => {
  jobForm.reset();
  jobId.value = "";
  jobSubmitButton.textContent = "Spara uppdrag";
  setStatus(jobStatus, "");
};

const fillJobForm = (job) => {
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
};

const renderJobs = (jobs) => {
  jobsAdminList.innerHTML = "";

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
          <button class="button button-ghost" type="button" data-action="edit">Redigera</button>
          <button class="button button-ghost" type="button" data-action="toggle">
            ${job.published ? "Avpublicera" : "Publicera"}
          </button>
          <button class="button button-ghost" type="button" data-action="delete">Ta bort</button>
        </div>
      </div>
      <p>${job.summary || ""}</p>
      <div class="admin-tag-row">${tagMarkup}</div>
      <span>Plats: ${job.location || "Ej angivet"}</span>
      <span>Omfattning: ${job.scope || "Ej angivet"}</span>
      <span>Senast uppdaterad: ${formatDate(job.updated_at || job.created_at)}</span>
    `;

    item.querySelector('[data-action="edit"]').addEventListener("click", () => {
      fillJobForm(job);
    });

    item.querySelector('[data-action="toggle"]').addEventListener("click", async () => {
      const { error } = await supabase
        .from("jobs")
        .update({ published: !job.published })
        .eq("id", job.id);

      if (error) {
        setStatus(jobStatus, "Det gick inte att uppdatera publicering.", "error");
        return;
      }

      await loadJobs();
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
      await loadJobs();
    });

    jobsAdminList.appendChild(item);
  });
};

const loadJobs = async () => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    setStatus(jobStatus, "Det gick inte att hamta uppdragen.", "error");
    return;
  }

  renderJobs(data || []);
};

const boot = async () => {
  const admin = await requireAdmin();
  if (!admin.ok) {
    return;
  }

  attachLogout(logoutButton);
  resetJobFormButton.addEventListener("click", resetJobForm);

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
    await loadJobs();
  });

  await loadJobs();
};

boot();
