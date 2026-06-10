import type { TicketPrediction } from "./ticketPrediction";
import { Precision } from "./ticketPredictionPrecision";
import { Recall } from "./ticketPredictionRecall";
import { F1Score } from "./ticketPredictionF1Score";

export type MacroAverageResult = {
  precision: number;
  recall: number;
  f1Score: number;
};

export const evaluateMacroAverage = (
  predictions: TicketPrediction[],
): MacroAverageResult => {
  const categories = new Set<string>();

  for (const prediction of predictions) {
    categories.add(prediction.expectedCategory);
    categories.add(prediction.predictedCategory);
  }

  if (categories.size === 0) {
    return {
      precision: 0,
      recall: 0,
      f1Score: 0,
    };
  }

  let precisionSum = 0;
  let recallSum = 0;
  let f1ScoreSum = 0;

  for (const category of categories) {
    const precisionResult = Precision.evaluate(predictions, category);
    const recallResult = Recall.evaluate(predictions, category);
    const f1ScoreResult = F1Score.evaluate(predictions, category);

    precisionSum += precisionResult.precision;
    recallSum += recallResult.recall;
    f1ScoreSum += f1ScoreResult.f1Score;
  }

  return {
    precision: precisionSum / categories.size,
    recall: recallSum / categories.size,
    f1Score: f1ScoreSum / categories.size,
  };
};
