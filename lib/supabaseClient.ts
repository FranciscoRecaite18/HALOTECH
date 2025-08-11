import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Cliente de Supabase configurado para autenticación y operaciones de base de datos.
 * Asegúrate de tener las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY configuradas.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
