import { ticketPredictions } from "../test-data/ticketPredictions";
import { runTicketPredictionDatasetEvaluation } from "../src/ticketPredictionDatasetEvaluation";
import { Precision } from "../src/ticketPredictionPrecision";
import { Recall } from "../src/ticketPredictionRecall";
import { F1Score } from "../src/ticketPredictionF1Score";

const report = runTicketPredictionDatasetEvaluation(ticketPredictions);
const categories = new Set<string>();
for (const prediction of ticketPredictions) {
  categories.add(prediction.expectedCategory);
  categories.add(prediction.predictedCategory);
}
console.log("AI Prediction Evaluation Report");
console.log("Dataset size:", report.total);
console.log("Correct predictions:", report.correct);
console.log("Incorrect predictions:", report.incorrect);
console.log("Accuracy:", (report.accuracy * 100).toFixed(2) + "%");
console.log("");
console.log("Per-category metrics:");

for (const category of categories) {
  console.log("Category:", category);
  const precisionResult = Precision.evaluate(ticketPredictions, category);
  const recallResult = Recall.evaluate(ticketPredictions, category);
  const f1ScoreResult = F1Score.evaluate(ticketPredictions, category);
  console.log("Precision:", (precisionResult.precision * 100).toFixed(2) + "%");
  console.log("Recall:", (recallResult.recall * 100).toFixed(2) + "%");
  console.log("F1 Score:", (f1ScoreResult.f1Score * 100).toFixed(2) + "%");
  console.log("");
}
