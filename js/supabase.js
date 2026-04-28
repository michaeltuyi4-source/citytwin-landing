// CityTwin — js/supabase.js
// Browser-safe Supabase client initialisation.
//
// Only the project URL and the anon/public key belong here.
// The anon key is safe to expose — row-level security policies enforce access.
//
// ⚠️  The service role key bypasses RLS entirely and must NEVER go in
//     client-side code. Keep it exclusively in Azure Function environment
//     variables (SUPABASE_SERVICE_ROLE_KEY).

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://xdbsimwqyjttfihuvpal.supabase.co';   // e.g. https://xxxx.supabase.co
const SUPABASE_ANON = 'sb_publishable_Z113DXxF-9D6qeluhzpcxA_kLGXAQXZ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
