// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js"
import type { AppContext } from "../types/context"

export function getSupabase(c: AppContext) {
  return createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY, {
    auth: { persistSession: false },
  })
}
