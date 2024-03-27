import { z } from "zod"

export const permanentTaxesRowSchema = z.object({
  type: z.string().refine(value => value === "permanent"),
  year: z.number().min(1900).max(2100),
  
})

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  classe: z.string(),
  filiere: z.string(),
  role: z.string(),
})
export type User = z.infer<typeof userSchema>

export const userReturnSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  classe: z.string(),
  filiere: z.string(),
  roles: z.string(),
})
export type UserReturn = z.infer<typeof userReturnSchema>

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export type Login = z.infer<typeof userSchema>

export const activitySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  prix: z.string().min(1),
  addresse: z.string().min(1),
  // dateDeb: z.coerce.date()
  //dateFin: z.date(),
  //img: z.instanceof(File),
})

export type activity = z.infer<typeof activitySchema>