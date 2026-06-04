import { Ticket } from "../src/ticketSchema";

export const validTicket: Ticket = {
  category: "billing",
  urgency: "high",
  summary: "Customer was charged twice.",
  needsHumanReview: true,
};

export const invalidTicket = {
  ...validTicket,
  category: "payment",
};

export const businessRuleViolationTicket = {
  ...validTicket,
  needsHumanReview: false,
};
