import { evaluateTicket } from "./ticketEvaluation";
import type { EvaluationResult } from "./ticketEvaluation";
import {
  SCHEMA_VALIDATION_FAILED,
  BUSINESS_RULE_VALIDATION_FAILED,
} from "./evaluationErrors";

export type DatasetEvaluationResult = {
  total: number;
  passed: number;
  failed: number;
  schemaFailures: number;
  businessRuleFailures: number;
  results: EvaluationResult[];
};
export const runTicketDatasetEvaluation = (
  tickets: unknown[],
): DatasetEvaluationResult => {
  const results = tickets.map(evaluateTicket);
  return {
    total: tickets.length,
    passed: results.filter((result) => result.valid).length,
    failed: results.filter((result) => !result.valid).length,
    schemaFailures: results.filter((result) =>
      result.errors.includes(SCHEMA_VALIDATION_FAILED),
    ).length,

    businessRuleFailures: results.filter((result) =>
      result.errors.includes(BUSINESS_RULE_VALIDATION_FAILED),
    ).length,
    results,
  };
};
