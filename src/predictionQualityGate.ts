import type { TicketPrediction } from "./ticketPrediction";
import { runTicketPredictionDatasetEvaluation } from "./ticketPredictionDatasetEvaluation";
import { evaluateMacroAverage } from "./ticketPredictionMacroAverage";
import { evaluateWeightedAverage } from "./ticketPredictionWeightedAverage";

export type PredictionQualityGateConfig = {
  minAccuracy: number;
  minMacroF1Score: number;
  minWeightedF1Score: number;
};

export type PredictionQualityGateResult = {
  passed: boolean;
  accuracy: number;
  macroF1Score: number;
  weightedF1Score: number;
  failures: string[];
};

export const evaluatePredictionQualityGate = (
  predictions: TicketPrediction[],
  config: PredictionQualityGateConfig,
): PredictionQualityGateResult => {
  const datasetEvaluation = runTicketPredictionDatasetEvaluation(predictions);
  const macroAverage = evaluateMacroAverage(predictions);
  const weightedAverage = evaluateWeightedAverage(predictions);

  const failures: string[] = [];

  if (datasetEvaluation.accuracy < config.minAccuracy) {
    failures.push(
      `Accuracy ${datasetEvaluation.accuracy} is below threshold ${config.minAccuracy}`,
    );
  }

  if (macroAverage.f1Score < config.minMacroF1Score) {
    failures.push(
      `Macro F1 Score ${macroAverage.f1Score} is below threshold ${config.minMacroF1Score}`,
    );
  }

  if (weightedAverage.f1Score < config.minWeightedF1Score) {
    failures.push(
      `Weighted F1 Score ${weightedAverage.f1Score} is below threshold ${config.minWeightedF1Score}`,
    );
  }

  return {
    passed: failures.length === 0,
    accuracy: datasetEvaluation.accuracy,
    macroF1Score: macroAverage.f1Score,
    weightedF1Score: weightedAverage.f1Score,
    failures,
  };
};
