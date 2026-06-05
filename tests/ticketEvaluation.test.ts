import { evaluateTicket } from "../src/ticketEvaluation";
import { describe, expect, test } from "vitest";
import {
  validTicket,
  invalidTicket,
  businessRuleViolationTicket,
} from "../test-data/tickets";
import {
  SCHEMA_VALIDATION_FAILED,
  BUSINESS_RULE_VALIDATION_FAILED,
} from "../src/evaluationErrors";

describe("evaluateTicket", () => {
  test("invalid schema returns schema validation error", () => {
    const result = evaluateTicket(invalidTicket);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(SCHEMA_VALIDATION_FAILED);
  });
  test("valid schema but fails business rules returns business rule validation error", () => {
    const result = evaluateTicket(businessRuleViolationTicket);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(BUSINESS_RULE_VALIDATION_FAILED);
  });
  test("valid schema and passed business rules returns valid result", () => {
    const result = evaluateTicket(validTicket);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
