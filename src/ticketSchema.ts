import { z } from "zod";

export const TicketSchema = z.object({
  category: z.enum(["billing", "technical", "account"]),
  urgency: z.enum(["low", "medium", "high"]),
  summary: z.string().trim().min(1),
  needsHumanReview: z.boolean(),
});

export const TicketsSchema = z.array(TicketSchema);
export type Ticket = z.infer<typeof TicketSchema>;
