import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://jyhoyiajazbveoahlnky.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_API_KEY ||'')

export default supabase;