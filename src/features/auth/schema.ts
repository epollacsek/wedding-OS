import { z } from 'zod'

function validateCpf(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i)
  let check = (sum * 10) % 11
  if (check === 10 || check === 11) check = 0
  if (check !== parseInt(digits[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i)
  check = (sum * 10) % 11
  if (check === 10 || check === 11) check = 0
  return check === parseInt(digits[10])
}

export const signInSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const organizerSignUpSchema = z.object({
  full_name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  whatsapp: z
    .string()
    .min(10, 'Enter a valid WhatsApp number')
    .regex(/^\+?[\d\s\-().]+$/, 'Enter a valid phone number'),
  cpf: z
    .string()
    .refine(validateCpf, 'Enter a valid CPF'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
})

export type SignInInput = z.infer<typeof signInSchema>
export type OrganizerSignUpInput = z.infer<typeof organizerSignUpSchema>
