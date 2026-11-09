import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// Prototype mode: Supabase is optional — all data is stored in localStorage.
// A stub client is exported so imports don't break; it is never actually called.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'http://localhost:54321'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'prototype-stub-key'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
