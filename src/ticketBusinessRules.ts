const validateTicketBusinessRules = (ticket: any) => {
  if (ticket.urgency === "high" && ticket.needsHumanReview === false) {
    return false;
  }
  return true;
};
export const TicketBusinessRules = {
  validate: validateTicketBusinessRules,
};
