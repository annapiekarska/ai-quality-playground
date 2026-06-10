import { describe, expect, test } from "vitest";
import { evaluatePredictionQualityGate } from "../src/predictionQualityGate";
import { ticketPredictions } from "../test-data/ticketPredictions";

describe("evaluatePredictionQualityGate", () => {
  test("passes when metrics meet configured thresholds", () => {
    const result = evaluatePredictionQualityGate(ticketPredictions, {
      minAccuracy: 0.45,
      minMacroF1Score: 0.45,
      minWeightedF1Score: 0.45,
    });

    expect(result.passed).toBe(true);
    expect(result.failures).toEqual([]);
    expect(result.accuracy).toBe(0.5);
    expect(result.macroF1Score).toBeCloseTo(0.49, 3);
    expect(result.weightedF1Score).toBeCloseTo(0.491, 3);
  });

  test("fails when accuracy is below the configured threshold", () => {
    const result = evaluatePredictionQualityGate(ticketPredictions, {
      minAccuracy: 0.9,
      minMacroF1Score: 0.45,
      minWeightedF1Score: 0.45,
    });

    expect(result.passed).toBe(false);
    expect(result.failures).toContain("Accuracy 0.5 is below threshold 0.9");
  });

  test("fails when macro F1 score is below the configured threshold", () => {
    const result = evaluatePredictionQualityGate(ticketPredictions, {
      minAccuracy: 0.45,
      minMacroF1Score: 0.9,
      minWeightedF1Score: 0.45,
    });

    expect(result.passed).toBe(false);
    expect(result.failures[0]).toContain("Macro F1 Score");
    expect(result.failures[0]).toContain("is below threshold 0.9");
  });

  test("fails when weighted F1 score is below the configured threshold", () => {
    const result = evaluatePredictionQualityGate(ticketPredictions, {
      minAccuracy: 0.45,
      minMacroF1Score: 0.45,
      minWeightedF1Score: 0.9,
    });

    expect(result.passed).toBe(false);
    expect(result.failures[0]).toContain("Weighted F1 Score");
    expect(result.failures[0]).toContain("is below threshold 0.9");
  });
});
