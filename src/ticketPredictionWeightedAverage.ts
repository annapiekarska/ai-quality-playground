import type { TicketPrediction } from "./ticketPrediction";
import { Precision } from "./ticketPredictionPrecision";
import { Recall } from "./ticketPredictionRecall";
import { F1Score } from "./ticketPredictionF1Score";

export type WeightedAverageResult = {
  precision: number;
  recall: number;
  f1Score: number;
};

export const evaluateWeightedAverage = (
  predictions: TicketPrediction[],
): WeightedAverageResult => {
  if (predictions.length === 0) {
    return {
      precision: 0,
      recall: 0,
      f1Score: 0,
    };
  }

  const categoryWeights = new Map<string, number>();

  for (const prediction of predictions) {
    const expectedCategory = prediction.expectedCategory;
    const currentCount = categoryWeights.get(expectedCategory) ?? 0;

    categoryWeights.set(expectedCategory, currentCount + 1);
  }

  let precisionWeightedSum = 0;
  let recallWeightedSum = 0;
  let f1ScoreWeightedSum = 0;

  for (const [category, weight] of categoryWeights) {
    const precisionResult = Precision.evaluate(predictions, category);
    const recallResult = Recall.evaluate(predictions, category);
    const f1ScoreResult = F1Score.evaluate(predictions, category);

    precisionWeightedSum += precisionResult.precision * weight;
    recallWeightedSum += recallResult.recall * weight;
    f1ScoreWeightedSum += f1ScoreResult.f1Score * weight;
  }

  return {
    precision: precisionWeightedSum / predictions.length,
    recall: recallWeightedSum / predictions.length,
    f1Score: f1ScoreWeightedSum / predictions.length,
  };
};
