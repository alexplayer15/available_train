import { z } from "zod";

export const AvailableTrainRequestSchema = z.object({
    departureCode: z.string()
      .length(3, "Departure code must be exactly 3 letters")
      .regex(/^[A-Z]+$/, "Departure code must contain only letters"),
    arrivalCode: z.string()
      .length(3, "Arrival code must be exactly 3 letters")
      .regex(/^[A-Z]+$/, "Arrival code must contain only letters"),
});

export type AvailableTrainRequest = z.infer<typeof AvailableTrainRequestSchema>;