import type { TicketPrediction } from "./ticketPrediction";

export type RecallResult = {
  label: string;
  truePositiveCount: number;
  actualPositiveCount: number;
  recall: number;
};

const evaluateRecallResult = (
  predictions: TicketPrediction[],
  label: string,
): RecallResult => {
  const truePositiveCount = predictions.filter(
    (prediction) =>
      prediction.predictedCategory === label &&
      prediction.expectedCategory === label,
  ).length;
  const actualPositiveCount = predictions.filter(
    (prediction) => prediction.expectedCategory === label,
  ).length;
  const recall =
    actualPositiveCount === 0 ? 0 : truePositiveCount / actualPositiveCount;
  return {
    label,
    truePositiveCount,
    actualPositiveCount,
    recall,
  };
};
export const Recall = {
  evaluate: evaluateRecallResult,
};
