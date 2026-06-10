import type { TicketPrediction } from "./ticketPrediction";
import { runTicketPredictionDatasetEvaluation } from "./ticketPredictionDatasetEvaluation";
import { Precision } from "./ticketPredictionPrecision";
import { Recall } from "./ticketPredictionRecall";
import { F1Score } from "./ticketPredictionF1Score";
import { buildConfusionMatrix } from "./ticketPredictionConfusionMatrix";
import { evaluateMacroAverage } from "./ticketPredictionMacroAverage";
import { evaluateWeightedAverage } from "./ticketPredictionWeightedAverage";

export const generatePredictionEvaluationReport = (
  predictions: TicketPrediction[],
): string => {
  const evaluation = runTicketPredictionDatasetEvaluation(predictions);
  const confusionMatrix = buildConfusionMatrix(predictions);
  const macroAverage = evaluateMacroAverage(predictions);
  const weightedAverage = evaluateWeightedAverage(predictions);
  const categories = new Set<string>();

  for (const prediction of predictions) {
    categories.add(prediction.expectedCategory);
    categories.add(prediction.predictedCategory);
  }

  const lines = [
    "AI Prediction Evaluation Report",
    `Dataset size: ${evaluation.total}`,
    `Correct predictions: ${evaluation.correct}`,
    `Incorrect predictions: ${evaluation.incorrect}`,
    `Accuracy: ${(evaluation.accuracy * 100).toFixed(2)}%`,
    "",
    "Per-category metrics:",
  ];

  for (const category of categories) {
    const precisionResult = Precision.evaluate(predictions, category);
    const recallResult = Recall.evaluate(predictions, category);
    const f1ScoreResult = F1Score.evaluate(predictions, category);

    lines.push(`Category: ${category}`);
    lines.push(`Precision: ${(precisionResult.precision * 100).toFixed(2)}%`);
    lines.push(`Recall: ${(recallResult.recall * 100).toFixed(2)}%`);
    lines.push(`F1 Score: ${(f1ScoreResult.f1Score * 100).toFixed(2)}%`);
    lines.push("");
  }
  lines.push("Macro average:");
  lines.push(`Precision: ${(macroAverage.precision * 100).toFixed(2)}%`);
  lines.push(`Recall: ${(macroAverage.recall * 100).toFixed(2)}%`);
  lines.push(`F1 Score: ${(macroAverage.f1Score * 100).toFixed(2)}%`);
  lines.push("");
  lines.push("Weighted average:");
  lines.push(`Precision: ${(weightedAverage.precision * 100).toFixed(2)}%`);
  lines.push(`Recall: ${(weightedAverage.recall * 100).toFixed(2)}%`);
  lines.push(`F1 Score: ${(weightedAverage.f1Score * 100).toFixed(2)}%`);
  lines.push("");
  lines.push("Confusion matrix:");

  for (const expectedCategory of Object.keys(confusionMatrix)) {
    const predictedCategories = confusionMatrix[expectedCategory];

    for (const predictedCategory of Object.keys(predictedCategories)) {
      const count = predictedCategories[predictedCategory];

      lines.push(`${expectedCategory} -> ${predictedCategory}: ${count}`);
    }
  }

  return lines.join("\n");
};
