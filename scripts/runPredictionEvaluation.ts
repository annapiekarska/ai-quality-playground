import { ticketPredictions } from "../test-data/ticketPredictions";
import { generatePredictionEvaluationReport } from "../src/predictionEvaluationReport";

const report = generatePredictionEvaluationReport(ticketPredictions);

console.log(report);
