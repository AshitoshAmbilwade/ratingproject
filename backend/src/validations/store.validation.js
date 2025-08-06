// src/validations/store.validation.js
import { z } from 'zod';

export const createStoreSchema = z.object({
  name: z.string().min(2, "Store name is required"),
  email: z.string().email("Invalid store email"),
  address: z.string().min(5, "Store address is required"),
});
