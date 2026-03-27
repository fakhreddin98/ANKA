import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const config = window.ANKA_CONFIG ?? {};

export const adminEmail = config.adminEmail ?? "fakher.abewe@gmail.com";
export const formSubmitEndpoint =
  config.formSubmitEndpoint ?? `https://formsubmit.co/${adminEmail}`;
export const storageBucket = config.storageBucket ?? "intake-files";
export const hasSupabaseConfig = Boolean(
  config.supabaseUrl && config.supabaseAnonKey
);

export const supabase = hasSupabaseConfig
  ? createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
