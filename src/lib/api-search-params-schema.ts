import { z } from "zod";

import { GENDERS } from "@/constants/genders";

export const apiSearchParamsSchema = z.object({
  key: z.string().optional(),
  size: z.coerce
    .number({ invalid_type_error: "size must be a positive number" })
    .min(1, { message: "size must be a positive number" })
    .max(1024, { message: "size must be less than 1024" })
    .optional()
    .default(1024)
    .catch(1024),
  gender: z.enum([GENDERS.MALE, GENDERS.FEMALE]).catch(GENDERS.FEMALE),
});
