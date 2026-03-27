import {
  adminEmail,
  hasSupabaseConfig,
  setStatus,
  supabase,
} from "./admin-common.js";

const configWarning = document.querySelector("#config-warning");
const loginPanel = document.querySelector("#login-panel");
const dashboard = document.querySelector("#admin-dashboard");
const loginForm = document.querySelector("#login-form");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginStatus = document.querySelector("#login-status");
const sessionLabel = document.querySelector("#admin-session-label");
const logoutButton = document.querySelector("#logout-button");
const metricPages = document.querySelector("#metric-pages");
const metricJobs = document.querySelector("#metric-jobs");
const metricInquiries = document.querySelector("#metric-inquiries");

const showLoggedOut = () => {
  loginPanel.hidden = false;
  dashboard.hidden = true;
  logoutButton.hidden = true;
  sessionLabel.textContent = "Ej inloggad";
};

const showLoggedIn = async (session) => {
  loginPanel.hidden = true;
  dashboard.hidden = false;
  logoutButton.hidden = false;
  sessionLabel.textContent = session.user.email;

  const [
    { count: pagesCount },
    { count: jobsCount },
    { count: inquiriesCount },
  ] = await Promise.all([
    supabase
      .from("site_pages")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  metricPages.textContent = String(pagesCount ?? 0);
  metricJobs.textContent = String(jobsCount ?? 0);
  metricInquiries.textContent = String(inquiriesCount ?? 0);
};

const verifySession = async (session) => {
  const email = session?.user?.email;

  if (!email) {
    showLoggedOut();
    return;
  }

  if (email !== adminEmail) {
    await supabase.auth.signOut();
    setStatus(loginStatus, "Kontot ar inte behorigt for admin.", "error");
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
    await verifySession(data.session);
  });

  logoutButton.addEventListener("click", async () => {
    await supabase.auth.signOut();
  });

  const { data } = await supabase.auth.getSession();
  await verifySession(data.session);

  supabase.auth.onAuthStateChange(async (_event, session) => {
    await verifySession(session);
  });
}
