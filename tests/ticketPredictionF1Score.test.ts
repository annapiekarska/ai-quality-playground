import { describe, expect, test } from "vitest";
import { F1Score } from "../src/ticketPredictionF1Score";
import type { TicketPrediction } from "../src/ticketPrediction";
import { validTicket } from "../test-data/tickets";

describe("TicketPredictionF1Score", () => {
  test("returns 1 when precision and recall are both 1", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        expectedCategory: "billing",
        predictedCategory: "billing",
      },
    ];
    const result = F1Score.evaluate(predictions, "billing");
    expect(result.label).toBe("billing");
    expect(result.precision).toBe(1);
    expect(result.recall).toBe(1);
    expect(result.f1Score).toBe(1);
  });
  test("returns 0.5 when precision and recall are both 0.5", () => {
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
    ];
    const result = F1Score.evaluate(predictions, "billing");
    expect(result.label).toBe("billing");
    expect(result.precision).toBe(0.5);
    expect(result.recall).toBe(0.5);
    expect(result.f1Score).toBe(0.5);
  });
  test("returns 0 when precision and recall are both 0", () => {
    const predictions: TicketPrediction[] = [
      {
        ticket: validTicket,
        expectedCategory: "technical",
        predictedCategory: "technical",
      },
      {
        ticket: validTicket,
        expectedCategory: "technical",
        predictedCategory: "technical",
      },
    ];
    const result = F1Score.evaluate(predictions, "billing");
    expect(result.label).toBe("billing");
    expect(result.precision).toBe(0);
    expect(result.recall).toBe(0);
    expect(result.f1Score).toBe(0);
  });
});
