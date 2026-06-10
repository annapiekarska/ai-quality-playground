import { describe, expect, test } from "vitest";
import { generatePredictionEvaluationReport } from "../src/predictionEvaluationReport";
import { ticketPredictions } from "../test-data/ticketPredictions";

describe("generatePredictionEvaluationReport", () => {
  test("generates a human-readable prediction evaluation report", () => {
    const report = generatePredictionEvaluationReport(ticketPredictions);

    expect(report).toContain("AI Prediction Evaluation Report");
    expect(report).toContain("Dataset size: 10");
    expect(report).toContain("Correct predictions: 5");
    expect(report).toContain("Incorrect predictions: 5");
    expect(report).toContain("Accuracy: 50.00%");
    expect(report).toContain("Per-category metrics:");

    expect(report).toContain("Category: billing");
    expect(report).toContain("Precision: 50.00%");
    expect(report).toContain("Recall: 50.00%");
    expect(report).toContain("F1 Score: 50.00%");

    expect(report).toContain("Confusion matrix:");
    expect(report).toContain("billing -> billing: 2");
    expect(report).toContain("billing -> technical: 1");
    expect(report).toContain("account -> technical: 1");

    expect(report).toContain("Macro average:");
    expect(report).toContain("Precision: 50.00%");
    expect(report).toContain("Recall: 50.00%");
    expect(report).toContain("F1 Score: 49.05%");
    expect(report).toContain(
      "Weighted average:\nPrecision: 50.00%\nRecall: 50.00%\nF1 Score: 49.14%",
    );
  });
});
