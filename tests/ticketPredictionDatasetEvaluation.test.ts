import { runTicketPredictionDatasetEvaluation } from "../src/ticketPredictionDatasetEvaluation";
import type { TicketPrediction } from "../src/ticketPrediction";
import { validTicket } from "../test-data/tickets";
import { describe, expect, test } from "vitest";

const prediction1: TicketPrediction = {
  ticket: validTicket,
  expectedCategory: "billing",
  predictedCategory: "billing",
};
const prediction2: TicketPrediction = {
  ticket: validTicket,
  expectedCategory: "billing",
  predictedCategory: "technical",
};
const prediction3: TicketPrediction = {
  ticket: validTicket,
  expectedCategory: "technical",
  predictedCategory: "technical",
};

describe("runTicketPredictionDatasetEvaluation", () => {
  test("dataset prediction evaluation returns correct statistics", () => {
    const predictions = [prediction1, prediction2, prediction3];
    const predictionResult = runTicketPredictionDatasetEvaluation(predictions);
    expect(predictionResult.total).toBe(3);
    expect(predictionResult.correct).toBe(2);
    expect(predictionResult.incorrect).toBe(1);
    expect(predictionResult.accuracy).toBe(2 / 3);
    expect(predictionResult.results.length).toBe(3);
  });
});
