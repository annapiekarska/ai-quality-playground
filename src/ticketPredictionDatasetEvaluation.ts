import type { TicketPredictionEvaluationResult } from "./ticketPredictionEvaluation";
import { TicketPrediction } from "./ticketPrediction";
import { TicketPredictionEvaluation } from "./ticketPredictionEvaluation";

export type TicketPredictionDatasetEvaluationResult = {
  total: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  results: TicketPredictionEvaluationResult[];
};
export const runTicketPredictionDatasetEvaluation = (
  ticketPredictions: TicketPrediction[],
): TicketPredictionDatasetEvaluationResult => {
  const results = ticketPredictions.map((prediction) =>
    TicketPredictionEvaluation.evaluate(prediction),
  );
  const total = ticketPredictions.length;
  const correct = results.filter((result) => result.correct).length;
  const incorrect = total - correct;
  const accuracy = total > 0 ? correct / total : 0;

  return {
    total,
    correct,
    incorrect,
    accuracy,
    results,
  };
};
