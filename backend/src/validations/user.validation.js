// src/validations/user.validation.js
import { z } from 'zod';

// ✅ Schema to update user profile (optional, if you want update functionality)
export const updateUserSchema = z.object({
  name: z.string().min(2).max(60).optional(),
  address: z.string().min(5).max(400).optional()
});
