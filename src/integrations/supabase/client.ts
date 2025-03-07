
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://llxzstqejdrplmxdjxlu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseHpzdHFlamRycGxteGRqeGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNzM3NDgsImV4cCI6MjA1MDY0OTc0OH0.dza-_2f6kCnY11CmnyHRf3kE-JxQTTnZm20GaZwiA9g";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: function customFetch(input, init) {
      return fetch(input, init);
    }
  }
});

// Add debug logging for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.debug('[Supabase Auth Event]:', event);
  console.debug('[Supabase Auth Session]:', {
    user: session?.user?.id,
    expiresAt: session?.expires_at,
    authenticated: !!session?.user
  });
});

// Add debug logging for fetch requests in development
if (process.env.NODE_ENV === 'development') {
  const originalFetch = window.fetch;
  window.fetch = async function(input, init) {
    if (typeof input === 'string' && input.includes('supabase')) {
      console.debug('[Supabase Request]:', {
        url: input,
        options: init
      });
    }
    return originalFetch.apply(window, [input, init]);
  };
}
