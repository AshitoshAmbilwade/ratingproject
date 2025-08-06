// src/validations/auth.validation.js
import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(1, "Address is required"),
  role: z.enum(["USER", "ADMIN", "STORE_OWNER"]),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
