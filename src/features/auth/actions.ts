'use server'

import { redirect } from 'next/navigation'
import { createServerClient, createServiceClient } from '@/lib/supabase/server'
import { organizerSignUpSchema, signInSchema } from './schema'
import type { OrganizerSignUpInput, SignInInput } from './schema'

export async function signIn(input: SignInInput) {
  const parsed = signInSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    return { error: 'Invalid email or password' }
  }

  redirect('/events')
}

export async function signUpOrganizer(input: OrganizerSignUpInput) {
  const parsed = organizerSignUpSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createServerClient()

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (authError || !authData.user) {
    return { error: authError?.message ?? 'Could not create account' }
  }

  const { error: profileError } = await createServiceClient().from('profiles').insert({
    id: authData.user.id,
    persona_type: 'host',
    full_name: parsed.data.full_name,
    whatsapp: parsed.data.whatsapp,
    cpf: parsed.data.cpf.replace(/\D/g, ''),
  })

  if (profileError) {
    return { error: 'Account created but profile setup failed. Please contact support.' }
  }

  redirect('/home')
}

export async function signOut() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}
