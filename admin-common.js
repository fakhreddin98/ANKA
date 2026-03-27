import {
  adminEmail,
  hasSupabaseConfig,
  storageBucket,
  supabase,
} from "./supabase-client.js";

export { adminEmail, hasSupabaseConfig, storageBucket, supabase };

export const setStatus = (target, message, tone = "") => {
  if (!target) {
    return;
  }

  target.textContent = message;
  target.dataset.state = tone;
};

export const formatDate = (value) =>
  new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export const parseTags = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const createSignedInquiryRows = async (inquiries = []) =>
  Promise.all(
    inquiries.map(async (entry) => {
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

export const requireAdmin = async (redirectTo = "admin.html") => {
  if (!hasSupabaseConfig) {
    return { ok: false, reason: "missing_config" };
  }

  const { data } = await supabase.auth.getSession();
  const email = data.session?.user?.email;

  if (!email || email !== adminEmail) {
    window.location.href = redirectTo;
    return { ok: false, reason: "unauthorized" };
  }

  return { ok: true, session: data.session };
};

export const attachLogout = (button, redirectTo = "admin.html") => {
  if (!button) {
    return;
  }

  button.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = redirectTo;
  });
};
