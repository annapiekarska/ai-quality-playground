import { describe, expect, test } from "vitest";
import { evaluateMacroAverage } from "../src/ticketPredictionMacroAverage";
import type { TicketPrediction } from "../src/ticketPrediction";
import { validTicket } from "../test-data/tickets";

describe("evaluateMacroAverage", () => {
  test("returns zero metrics for an empty dataset", () => {
    const result = evaluateMacroAverage([]);

    expect(result.precision).toBe(0);
    expect(result.recall).toBe(0);
    expect(result.f1Score).toBe(0);
  });

  test("returns perfect macro averages when all predictions are correct", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "billing",
      },
      {
        ticket: validTicket,
        expectedCategory: "technical",
        predictedCategory: "technical",
      },
      {
        ticket: validTicket,
        expectedCategory: "account",
        predictedCategory: "account",
      },
    ];

    const result = evaluateMacroAverage(predictions);

    expect(result.precision).toBe(1);
    expect(result.recall).toBe(1);
    expect(result.f1Score).toBe(1);
  });
  test("returns macro averages across multiple categories", () => {
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
        predictedCategory: "technical",
      },
    ];
    const result = evaluateMacroAverage(predictions);

    expect(result.precision).toBe(0.75);
    expect(result.recall).toBe(0.75);
    expect(result.f1Score).toBeCloseTo(2 / 3, 3);
  });
});
