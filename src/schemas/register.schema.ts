import z from 'zod';

export const registerSchema = z.object({
  name: z.string().min(5, 'Name must be at leasts 5 characters'),
  userName: z
    .string()
    .min(5, 'User name must be at leasts 5 characters')
    .max(20, 'User name is to long'),
  email: z.string().email(),
  phone: z.coerce
    .string()
    .min(10, 'Phone number must be at least 10 characters'),
  password: z.string().min(6, 'Password must be at leasts 6 characters'),
});

export type RegisterPayload = z.infer<typeof registerSchema>;
