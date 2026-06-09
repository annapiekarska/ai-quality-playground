import type { TicketPrediction } from "./ticketPrediction";

export type ConfusionMatrix = Record<string, Record<string, number>>;

export const buildConfusionMatrix = (
  predictions: TicketPrediction[],
): ConfusionMatrix => {
  const matrix: ConfusionMatrix = {};

  for (const prediction of predictions) {
    const expectedCategory = prediction.expectedCategory;
    const predictedCategory = prediction.predictedCategory;

    if (!matrix[expectedCategory]) {
      matrix[expectedCategory] = {};
    }

    if (!matrix[expectedCategory][predictedCategory]) {
      matrix[expectedCategory][predictedCategory] = 0;
    }

    matrix[expectedCategory][predictedCategory] += 1;
  }

  return matrix;
};
