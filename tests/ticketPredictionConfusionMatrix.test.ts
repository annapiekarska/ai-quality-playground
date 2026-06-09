import { buildConfusionMatrix } from "../src/ticketPredictionConfusionMatrix";
import { describe, expect, test } from "vitest";
import { validTicket } from "../test-data/tickets";
import type { TicketPrediction } from "../src/ticketPrediction";

describe("TicketPredictionConfusionMatrix", () => {
  test("counts expected billing predicted as technical", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "technical",
      },
    ];
    const matrix = buildConfusionMatrix(predictions);
    expect(matrix.billing.technical).toBe(1);
  });
  test("counts if the counting increases when the billing predicted as technical occures more than once", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "technical",
      },
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "technical",
      },
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "billing",
      },
    ];
    const matrix = buildConfusionMatrix(predictions);
    expect(matrix.billing.technical).toBe(2);
    expect(matrix.billing.billing).toBe(1);
  });
  test("builds a confusion matrix for multiple categories", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "billing",
      },
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "technical",
      },
      {
        ticket: validTicket,
        expectedCategory: "technical",
        predictedCategory: "billing",
      },
      {
        ticket: validTicket,
        expectedCategory: "account",
        predictedCategory: "account",
      },
      {
        ticket: validTicket,
        expectedCategory: "account",
        predictedCategory: "technical",
      },
    ];
    const matrix = buildConfusionMatrix(predictions);
    expect(matrix.billing.technical).toBe(1);
    expect(matrix.billing.billing).toBe(1);
    expect(matrix.technical.billing).toBe(1);
    expect(matrix.account.account).toBe(1);
    expect(matrix.account.technical).toBe(1);
  });
});
