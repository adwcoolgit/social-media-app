import z from 'zod';

export const registerSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  userName: z.string().min(5, 'User name must be at least 5 characters').max(15, 'User name is too long'),
  email: z.string().email,
  phoneNumber: z.coerce
    .number()
    .positive()
    .min(10, 'Number phone must be at least 10 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters').
});
