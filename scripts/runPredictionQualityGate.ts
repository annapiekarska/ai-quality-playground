import { ticketPredictions } from "../test-data/ticketPredictions";
import { evaluatePredictionQualityGate } from "../src/predictionQualityGate";

const result = evaluatePredictionQualityGate(ticketPredictions, {
  minAccuracy: 0.45,
  minMacroF1Score: 0.45,
  minWeightedF1Score: 0.45,
});

console.log("AI Prediction Quality Gate");
console.log(`Accuracy: ${(result.accuracy * 100).toFixed(2)}%`);
console.log(`Macro F1 Score: ${(result.macroF1Score * 100).toFixed(2)}%`);
console.log(`Weighted F1 Score: ${(result.weightedF1Score * 100).toFixed(2)}%`);
console.log(`Passed: ${result.passed}`);

if (!result.passed) {
  console.log("Failures:");

  for (const failure of result.failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}
