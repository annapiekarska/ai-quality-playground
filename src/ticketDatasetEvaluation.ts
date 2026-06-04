import { evaluateTicket } from "./ticketEvaluation";

export const runTicketDatasetEvaluation = (tickets: unknown[]) => {
  const results = tickets.map(evaluateTicket);
  return {
    total: tickets.length,
    passed: results.filter((result) => result.valid).length,
    failed: results.filter((result) => !result.valid).length,
    schemaFailures: results.filter((result) =>
      result.errors.includes("schema-validation-failed"),
    ).length,

    businessRuleFailures: results.filter((result) =>
      result.errors.includes("business-rule-validation-failed"),
    ).length,
    results,
  };
};
