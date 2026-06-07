import type { TicketPrediction } from "./ticketPrediction";

export type PrecisionResult = {
  label: string;
  truePositiveCount: number;
  predictedPositiveCount: number;
  precision: number;
};

const evaluateLabelPrecision = (
  predictions: TicketPrediction[],
  label: string,
): PrecisionResult => {
  const predictedPositiveCount = predictions.filter(
    (prediction) => prediction.predictedCategory === label,
  ).length;
  const truePositiveCount = predictions.filter(
    (prediction) =>
      prediction.predictedCategory === label &&
      prediction.expectedCategory === label,
  ).length;
  const precision =
    predictedPositiveCount === 0
      ? 0
      : truePositiveCount / predictedPositiveCount;
  return {
    label,
    truePositiveCount,
    predictedPositiveCount,
    precision,
  };
};
export const Precision = {
  evaluate: evaluateLabelPrecision,
};
