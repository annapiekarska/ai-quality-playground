import { ticketPredictions } from "../test-data/ticketPredictions";
import { runTicketPredictionDatasetEvaluation } from "../src/ticketPredictionDatasetEvaluation";

const report = runTicketPredictionDatasetEvaluation(ticketPredictions);

console.log("AI Prediction Evaluation Report");
console.log("Dataset size:", report.total);
console.log("Correct predictions:", report.correct);
console.log("Incorrect predictions:", report.incorrect);
console.log("Accuracy:", (report.accuracy * 100).toFixed(2) + "%");
