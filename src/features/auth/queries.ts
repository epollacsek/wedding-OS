import { createServerClient } from '@/lib/supabase/server'
import type { Profile } from '@/types/database'

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('id, persona_type, full_name, whatsapp, cpf, created_at')
    .eq('id', user.id)
    .single()

  return data ?? null
}
