import { describe, expect, test } from "vitest";
import { Precision } from "../src/ticketPredictionPrecision";
import type { TicketPrediction } from "../src/ticketPrediction";
import { validTicket } from "../test-data/tickets";

describe("TicketPredictionPrecision", () => {
  test("calculates precision for a selected label", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        predictedCategory: "billing",
        expectedCategory: "billing",
      },
    ];
    const result = Precision.evaluate(predictions, "billing");
    expect(result.label).toBe("billing");
    expect(result.predictedPositiveCount).toBe(1);
    expect(result.truePositiveCount).toBe(1);
    expect(result.precision).toBe(1);
  });
  test("calculates precision when some predictions for the label are incorrect", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        predictedCategory: "billing",
        expectedCategory: "billing",
      },
      {
        ticket: validTicket,
        predictedCategory: "billing",
        expectedCategory: "technical",
      },
    ];
    const result = Precision.evaluate(predictions, "billing");
    expect(result.predictedPositiveCount).toBe(2);
    expect(result.truePositiveCount).toBe(1);
    expect(result.precision).toBe(0.5);
  });
  test("returns 0 precision when the label was never predicted", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        predictedCategory: "technical",
        expectedCategory: "technical",
      },
      {
        ticket: validTicket,
        predictedCategory: "technical",
        expectedCategory: "technical",
      },
    ];
    const result = Precision.evaluate(predictions, "billing");
    expect(result.predictedPositiveCount).toBe(0);
    expect(result.truePositiveCount).toBe(0);
    expect(result.precision).toBe(0);
  });
});
