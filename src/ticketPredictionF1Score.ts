import type { TicketPrediction } from "./ticketPrediction";
import { Precision } from "./ticketPredictionPrecision";
import { Recall } from "./ticketPredictionRecall";

export type F1ScoreResult = {
  label: string;
  precision: number;
  recall: number;
  f1Score: number;
};

const evaluateF1Score = (
  predictions: TicketPrediction[],
  label: string,
): F1ScoreResult => {
  const precision = Precision.evaluate(predictions, label).precision;
  const recall = Recall.evaluate(predictions, label).recall;
  const f1Score =
    precision + recall === 0
      ? 0
      : (2 * (precision * recall)) / (precision + recall);
  return {
    label,
    precision,
    recall,
    f1Score,
  };
};
export const F1Score = {
  evaluate: evaluateF1Score,
};
