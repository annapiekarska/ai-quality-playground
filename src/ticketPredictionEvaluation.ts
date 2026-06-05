import type { TicketPrediction } from "./ticketPrediction";

export type TicketPredictionEvaluationResult = {
  correct: boolean;
};

const evaluateTicketPrediction = (
  prediction: TicketPrediction,
): TicketPredictionEvaluationResult => {
  return prediction.expectedCategory === prediction.predictedCategory
    ? { correct: true }
    : { correct: false };
};

export const TicketPredictionEvaluation = {
  evaluate: evaluateTicketPrediction,
};
