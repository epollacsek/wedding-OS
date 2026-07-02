'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type PersonalData = {
  firstName: string
  lastName: string
  preferredName: string
  birthDate: string
  nationality: string
  whatsapp: string
}

type AddressData = {
  address: string
  city: string
  postcode: string
  country: string
}

type CommunicationData = {
  preferredLanguage: string
}

export async function updatePersonalData(data: PersonalData) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const fullName = [data.firstName.trim(), data.lastName.trim()].filter(Boolean).join(' ')

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      preferred_name: data.preferredName.trim() || null,
      birth_date: data.birthDate || null,
      nationality: data.nationality.trim() || null,
      whatsapp: data.whatsapp.trim(),
    })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/profile')
  return { success: true }
}

export async function updateAddress(data: AddressData) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('profiles')
    .update({
      address: data.address.trim() || null,
      city: data.city.trim() || null,
      postcode: data.postcode.trim() || null,
      country: data.country.trim() || null,
    })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/profile')
  return { success: true }
}

export async function updateCommunicationPrefs(data: CommunicationData) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('profiles')
    .update({ preferred_language: data.preferredLanguage })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/profile')
  return { success: true }
}
