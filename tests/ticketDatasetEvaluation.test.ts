import { runTicketDatasetEvaluation } from "../src/ticketDatasetEvaluation";
import { describe, expect, test } from "vitest";
import {
  validTicket,
  invalidTicket,
  businessRuleViolationTicket,
} from "../test-data/tickets";

describe("runTicketDatasetEvaluation", () => {
  test("dataset evaluation returns correct summary statistics", () => {
    const tickets = [validTicket, invalidTicket, businessRuleViolationTicket];
    const evaluationResult = runTicketDatasetEvaluation(tickets);
    expect(evaluationResult.total).toBe(3);
    expect(evaluationResult.passed).toBe(1);
    expect(evaluationResult.failed).toBe(2);
    expect(evaluationResult.schemaFailures).toBe(1);
    expect(evaluationResult.businessRuleFailures).toBe(1);
  });
});
