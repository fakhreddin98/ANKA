import {
  attachLogout,
  createSignedInquiryRows,
  formatDate,
  requireAdmin,
  supabase,
} from "./admin-common.js";

const logoutButton = document.querySelector("#logout-button");
const inquiriesAdminList = document.querySelector("#inquiries-admin-list");

const renderInquiries = (inquiries) => {
  inquiriesAdminList.innerHTML = "";

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
        <select class="admin-select">
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

      await loadInquiries();
    });

    inquiriesAdminList.appendChild(item);
  });
};

const loadInquiries = async () => {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    inquiriesAdminList.innerHTML =
      '<div class="admin-list-item"><p>Det gick inte att hamta formular just nu.</p></div>';
    return;
  }

  const inquiryRows = await createSignedInquiryRows(data || []);
  renderInquiries(inquiryRows);
};

const boot = async () => {
  const admin = await requireAdmin();
  if (!admin.ok) {
    return;
  }

  attachLogout(logoutButton);
  await loadInquiries();
};

boot();
