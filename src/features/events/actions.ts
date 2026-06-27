'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function selectEvent(eventName: string, role: string) {
  const jar = await cookies()
  jar.set('active_event', JSON.stringify({ name: eventName, role }), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  })
  redirect('/home')
}
