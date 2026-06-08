import { runTicketPredictionDatasetEvaluation } from "../src/ticketPredictionDatasetEvaluation";
import { ticketPredictions } from "../test-data/ticketPredictions";
import { describe, expect, test } from "vitest";

describe("runTicketPredictionDatasetEvaluation", () => {
  test("dataset prediction evaluation returns correct statistics", () => {
    const predictions = ticketPredictions;
    const predictionResult = runTicketPredictionDatasetEvaluation(predictions);
    expect(predictionResult.total).toBe(10);
    expect(predictionResult.correct).toBe(5);
    expect(predictionResult.incorrect).toBe(5);
    expect(predictionResult.accuracy).toBe(0.5);
    expect(predictionResult.results.length).toBe(10);
  });
});
