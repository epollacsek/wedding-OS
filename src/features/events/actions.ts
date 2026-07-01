'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

export async function selectEvent(eventName: string, role: string) {
  const jar = await cookies()
  jar.set('active_event', JSON.stringify({ name: eventName, role }), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  })
  redirect('/home')
}

export async function createEvent(data: {
  name: string
  type: string
  ceremonyDate?: string
}) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('events').insert({
    user_id: user.id,
    name: data.name,
    type: data.type.toLowerCase(),
    ceremony_date: data.ceremonyDate ?? null,
  })

  if (error) return { error: error.message }

  redirect('/events')
}
