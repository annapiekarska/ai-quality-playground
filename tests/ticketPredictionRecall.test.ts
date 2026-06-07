import { describe, expect, test } from "vitest";
import { Recall } from "../src/ticketPredictionRecall";
import type { TicketPrediction } from "../src/ticketPrediction";
import { validTicket } from "../test-data/tickets";

describe("TicketPredictionRecall", () => {
  test("calculates recall for a selected label", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "billing",
      },
    ];
    const result = Recall.evaluate(predictions, "billing");
    expect(result.label).toBe("billing");
    expect(result.actualPositiveCount).toBe(1);
    expect(result.truePositiveCount).toBe(1);
    expect(result.recall).toBe(1);
  });
  test("calculates recall when some actual labels were missed", () => {
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
    ];
    const result = Recall.evaluate(predictions, "billing");
    expect(result.label).toBe("billing");
    expect(result.actualPositiveCount).toBe(2);
    expect(result.truePositiveCount).toBe(1);
    expect(result.recall).toBe(0.5);
  });
  test("returns 0 recall when the label has no actual positives", () => {
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
    const result = Recall.evaluate(predictions, "billing");
    expect(result.label).toBe("billing");
    expect(result.actualPositiveCount).toBe(0);
    expect(result.truePositiveCount).toBe(0);
    expect(result.recall).toBe(0);
  });
});
