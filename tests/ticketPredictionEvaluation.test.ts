import { TicketPredictionEvaluation } from "../src/ticketPredictionEvaluation";
import { describe, expect, test } from "vitest";
import { validTicket } from "../test-data/tickets";
import type { TicketPrediction } from "../src/ticketPrediction";

describe("TicketPredictionEvaluation", () => {
  test("correct prediction returns correct true", () => {
    const ticketPrediction: TicketPrediction = {
      ticket: validTicket,
      expectedCategory: "billing",
      predictedCategory: "billing",
    };
    const result = TicketPredictionEvaluation.evaluate(ticketPrediction);
    expect(result.correct).toBe(true);
  });
  test("incorrect prediction returns correct false", () => {
    const ticketPrediction: TicketPrediction = {
      ticket: validTicket,
      expectedCategory: "billing",
      predictedCategory: "technical",
    };
    const result = TicketPredictionEvaluation.evaluate(ticketPrediction);
    expect(result.correct).toBe(false);
  });
});
