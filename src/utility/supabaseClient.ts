import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://mxrpuusafxbybiaizyja.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cnB1dXNhZnhieWJpYWl6eWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODQ4NjMsImV4cCI6MjAwNTE2MDg2M30.MR0mjR_68jTh4PaDNmr81kL0iJqCOItQUXkkv7h5vw0";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: true,
  }
});
