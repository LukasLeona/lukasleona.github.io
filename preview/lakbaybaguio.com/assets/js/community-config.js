/*
 * Lakbay Baguio community configuration.
 *
 * 1. Run supabase/community.sql in a Supabase project.
 * 2. Enable Anonymous Sign-Ins in Supabase Auth.
 * 3. Paste the project URL and publishable key below.
 * 4. Set enabled to true.
 *
 * A publishable/anon key is intended for browser use when Row Level Security is
 * enabled. Never place a service_role or secret key in this file.
 */
window.LAKBAY_COMMUNITY_CONFIG = Object.freeze({
  enabled: false,
  supabaseUrl: "",
  supabasePublishableKey: "",
  nearbyRadiusMeters: 5000,
  presenceRefreshMs: 45000,
  supabaseJsUrl: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
});
