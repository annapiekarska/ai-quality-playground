import { Ticket } from "./ticketSchema";

const validateTicketBusinessRules = (ticket: Ticket) => {
  if (ticket.urgency === "high" && !ticket.needsHumanReview) {
    return false;
  }
  return true;
};
export const TicketBusinessRules = {
  validate: validateTicketBusinessRules,
};
