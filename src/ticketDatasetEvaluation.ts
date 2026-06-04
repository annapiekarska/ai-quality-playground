import { evaluateTicket } from "./ticketEvaluation";

export const runTicketDatasetEvaluation = (tickets: any[]) => {
  const results = tickets.map(evaluateTicket);
  return {
    total: tickets.length,
    passed: results.filter((result) => result.valid).length,
    failed: results.filter((result) => !result.valid).length,
    results,
  };
};
