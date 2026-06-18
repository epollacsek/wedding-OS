export type PersonaType = 'organizer' | 'planner' | 'vendor' | 'worker'

export interface Profile {
  id: string
  persona_type: PersonaType
  full_name: string
  whatsapp: string
  cpf: string | null
  created_at: string
}
