import { evaluateWeightedAverage } from "../src/ticketPredictionWeightedAverage";
import type { TicketPrediction } from "../src/ticketPrediction";
import { validTicket } from "../test-data/tickets";
import { describe, expect, test } from "vitest";

describe("evaluateWeightedAverage", () => {
  test("returns zero metrics for an empty dataset", () => {
    const result = evaluateWeightedAverage([]);

    expect(result.precision).toBe(0);
    expect(result.recall).toBe(0);
    expect(result.f1Score).toBe(0);
  });
  test("returns perfect weighted averages when all predictions are correct", () => {
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

    const result = evaluateWeightedAverage(predictions);

    expect(result.precision).toBe(1);
    expect(result.recall).toBe(1);
    expect(result.f1Score).toBe(1);
  });
  test("weights metrics by expected category counts", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "billing",
      },
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

    const result = evaluateWeightedAverage(predictions);

    expect(result.precision).toBeCloseTo(0.875, 3);
    expect(result.recall).toBeCloseTo(0.75, 3);
    // Weighted F1 = ((0.8 * 3) + ((2 / 3) * 1)) / 4 = 23 / 30
    expect(result.f1Score).toBeCloseTo(23 / 30, 3);
  });
});
