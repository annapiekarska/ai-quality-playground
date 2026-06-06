import { ticketPredictions } from "../test-data/ticketPredictions";
import { runTicketPredictionDatasetEvaluation } from "../src/ticketPredictionDatasetEvaluation";

const report = runTicketPredictionDatasetEvaluation(ticketPredictions);
console.log(report);
