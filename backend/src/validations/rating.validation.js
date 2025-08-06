// src/validations/rating.validation.js
import { z } from 'zod';

export const ratingSchema = z.object({
  rating: z.number().min(1, 'Minimum rating is 1').max(5, 'Maximum rating is 5')
});
