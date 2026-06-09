# AI Quality Playground

AI Quality Playground is a TypeScript-based portfolio project focused on evaluating the quality of AI-style ticket classification outputs.

The project does not train a machine learning model. Instead, it focuses on the quality layer around model outputs: validating structured data, comparing predicted categories with expected categories, calculating evaluation metrics, and generating a human-readable report.

## Purpose

This project was built as a portfolio project to demonstrate practical Quality Engineering skills applied to AI-style outputs:

- Structured output validation
- Business rule validation
- Dataset-level evaluation
- Prediction evaluation
- Accuracy, precision, recall, and F1 score
- Per-category quality analysis
- Automated testing
- Human-readable quality reporting

It shows how a QA Lead / Quality Engineer can design a quality layer around model predictions by validating structured data, comparing predicted outputs with expected results, calculating evaluation metrics, and producing a readable quality report.

The project focuses on AI Quality Engineering rather than machine learning model development. Its purpose is to demonstrate how traditional QA practices such as validation, test data design, metrics, edge case testing, and reporting can be applied to AI evaluation workflows.

## What the project evaluates

The project works with ticket-like objects containing fields such as:

- `category`
- `urgency`
- `summary`
- `needsHumanReview`

The current schema supports the following ticket categories:

- `billing`
- `technical`
- `account`

It also supports urgency levels:

- `low`
- `medium`
- `high`

A business rule is included:

> High urgency tickets must require human review.

## Current features

### Schema validation

Ticket objects are validated using Zod.

The schema checks whether a ticket has the expected structure and valid field values.

### Business rule validation

The project includes business validation beyond schema correctness.

Example rule:

```text
If urgency is high, needsHumanReview must be true.
```

### Ticket evaluation

A single ticket can be evaluated and marked as valid or invalid.

The evaluation can return errors such as:

```text
schema-validation-failed
business-rule-validation-failed
```

### Dataset evaluation

A dataset of tickets can be evaluated as a group.

The dataset evaluation returns:

- Total number of tickets
- Passed tickets
- Failed tickets
- Schema validation failures
- Business rule failures
- Individual evaluation results

### Prediction evaluation

The project supports AI-style prediction evaluation.

A prediction contains:

```ts
{
  ticket: Ticket;
  expectedCategory: Ticket["category"];
  predictedCategory: Ticket["category"];
}
```

This allows the project to compare the expected ticket category with the predicted category.

### Accuracy

Accuracy is calculated at dataset level.

It answers the question:

> How many predictions were correct out of all predictions?

Formula:

```text
Accuracy = correct predictions / all predictions
```

Accuracy is useful, but it can be misleading when the dataset is imbalanced.

### Precision

Precision is calculated per category.

It answers the question:

> When the model predicted this category, how often was it correct?

Formula:

```text
Precision = true positives / predicted positives
```

Example:

If the model predicted `billing` 4 times and only 2 of those predictions were actually `billing`, then precision for `billing` is:

```text
2 / 4 = 50%
```

### Recall

Recall is calculated per category.

It answers the question:

> Out of all tickets that actually belonged to this category, how many did the model find?

Formula:

```text
Recall = true positives / actual positives
```

Example:

If there were 4 actual `billing` tickets and the model correctly found 2 of them, then recall for `billing` is:

```text
2 / 4 = 50%
```

### F1 Score

F1 Score combines precision and recall into one balanced metric.

Formula:

```text
F1 = 2 * (precision * recall) / (precision + recall)
```

F1 Score is useful when both false positives and false negatives matter.

## Confusion matrix

The project also includes a confusion matrix for prediction evaluation.

The confusion matrix shows how expected categories were classified by the model.

Example:

```text
billing -> billing: 2
billing -> technical: 1
billing -> account: 1
```

## Human-readable report

The project includes a terminal report for prediction evaluation.

Run:

```bash
npx tsx scripts/runPredictionEvaluation.ts
```

Example output:

```text
AI Prediction Evaluation Report
Dataset size: 10
Correct predictions: 5
Incorrect predictions: 5
Accuracy: 50.00%

Per-category metrics:
Category: billing
Precision: 50.00%
Recall: 50.00%
F1 Score: 50.00%

Category: technical
Precision: 50.00%
Recall: 66.67%
F1 Score: 57.14%

Category: account
Precision: 50.00%
Recall: 33.33%
F1 Score: 40.00%

Confusion matrix:
billing -> billing: 2
billing -> technical: 1
billing -> account: 1
technical -> technical: 2
technical -> billing: 1
account -> account: 1
account -> billing: 1
account -> technical: 1
```

This report shows why accuracy alone is not enough.

Although the overall accuracy is 50%, the per-category metrics reveal different quality patterns:

- `billing` has balanced but weak precision and recall, which means the model both overpredicts and misses billing tickets.
- `technical` has higher recall than precision, which means the model finds more actual technical tickets, but still produces false positives.
- `account` has the weakest recall, which means the model misses most actual account-related tickets.

This kind of breakdown helps identify which categories need improvement instead of relying only on overall accuracy.

## Tech stack

- TypeScript
- Node.js
- Zod
- Vitest
- tsx

## Project structure

```text
scripts/
  runPredictionEvaluation.ts

src/
  ticketBusinessRules.ts
  ticketDatasetEvaluation.ts
  ticketEvaluation.ts
  ticketEvaluationErrors.ts
  ticketPrediction.ts
  ticketPredictionDatasetEvaluation.ts
  ticketPredictionEvaluation.ts
  ticketPredictionF1Score.ts
  ticketPredictionPrecision.ts
  ticketPredictionRecall.ts
  ticketSchema.ts

test-data/
  tickets.ts
  ticketPredictions.ts

tests/
  ticketBusinessRules.test.ts
  ticketDatasetEvaluation.test.ts
  ticketEvaluation.test.ts
  ticketPredictionDatasetEvaluation.test.ts
  ticketPredictionEvaluation.test.ts
  ticketPredictionF1Score.test.ts
  ticketPredictionPrecision.test.ts
  ticketPredictionRecall.test.ts
  ticketSchema.test.ts
```

## Installation

```bash
npm install
```

## Running tests

```bash
npm test
```

The project uses Vitest for automated testing.

You can also run tests in watch mode:

```bash
npm run test:watch
```

## Running the prediction report

```bash
npx tsx scripts/runPredictionEvaluation.ts
```

## Example workflow

The project follows this evaluation flow:

```text
Ticket dataset
  ↓
Schema validation
  ↓
Business rule validation
  ↓
Prediction comparison
  ↓
Dataset-level accuracy
  ↓
Per-category precision, recall, and F1 score
  ↓
Human-readable report
```

## Why this project matters

In AI Quality Engineering, model output should not be trusted blindly.

A model can appear to perform well when measured only with accuracy, especially if the dataset is imbalanced.

For example:

```text
95 tickets are billing
5 tickets are technical
```

If a model always predicts `billing`, it can still reach 95% accuracy while completely failing to identify technical tickets.

That is why this project evaluates predictions using:

- Accuracy
- Precision
- Recall
- F1 score

This gives a clearer view of model quality per category.

## What this project demonstrates

This project demonstrates practical understanding of:

- AI output evaluation
- Structured output validation
- Classification metrics
- Dataset-based evaluation
- False positives and false negatives
- Quality reporting
- Edge case handling
- TypeScript typing
- Automated testing
- Separation of validation, evaluation, metrics, and reporting logic

## Current status

Completed:

- Ticket schema validation
- Business rule validation
- Ticket evaluation
- Ticket dataset evaluation
- Prediction evaluation
- Accuracy
- Precision
- Recall
- F1 score
- Human-readable prediction report
- Automated tests
- `.gitignore` and repository cleanup
- Expand the prediction dataset
- Refactor report generation into a dedicated report module
- Add tests for report formatting
- Add a confusion matrix

## Roadmap

Planned next steps:

- Add macro and weighted averages
- Add quality gates based on metric thresholds
- Add GitHub Actions for CI
- Explore Langfuse basics
- Explore Phoenix basics
- Connect the project to broader AI Quality and AI Governance concepts

## Career relevance

This project is designed as a portfolio project for roles related to:

- QA Lead
- Quality Engineering Manager
- AI Quality Engineer
- AI Quality Lead
- Quality Governance Lead

It demonstrates practical skills relevant to AI Quality and Quality Engineering, including:

- Designing evaluation logic for AI-style predictions
- Validating structured outputs
- Building dataset-level quality checks
- Calculating classification metrics
- Understanding false positives and false negatives
- Creating human-readable quality reports
- Writing automated tests for evaluation logic
- Thinking beyond accuracy when assessing model output quality

The project intentionally focuses on the quality and governance layer around AI systems, rather than model training. This reflects the type of work expected in AI Quality, Quality Strategy, and AI Governance roles.
