# AI Quality Playground

AI Quality Playground is a TypeScript-based portfolio project focused on evaluating the quality of AI-style ticket classification outputs.

The project does not train a machine learning model. Instead, it focuses on the quality layer around model outputs: validating structured data, comparing predicted categories with expected categories, calculating evaluation metrics, and generating a human-readable report.

## Purpose

This project was created to practice and demonstrate core AI Quality Engineering concepts:

- structured output validation
- business rule validation
- dataset-level evaluation
- prediction evaluation
- accuracy, precision, recall, and F1 score
- per-category quality analysis
- automated testing
- human-readable quality reporting

The project simulates a common AI Quality workflow where an AI system classifies support tickets into categories, and the quality layer evaluates whether those predictions are reliable.

## What the project evaluates

The project works with ticket-like objects containing fields such as:

- category
- urgency
- summary
- needsHumanReview

The current schema supports the following ticket categories:

- billing
- technical
- account

It also supports urgency levels:

- low
- medium
- high

A business rule is included:

> High urgency tickets must require human review.

## Current features

### Schema validation

Ticket objects are validated using Zod.

The schema checks whether a ticket has the expected structure and valid field values.

### Business rule validation

The project includes business validation beyond schema correctness.

Example rule:

txt If urgency is high, needsHumanReview must be true.

### Ticket evaluation

A single ticket can be evaluated and marked as valid or invalid.

The evaluation can return errors such as:

txt schema-validation-failed business-rule-validation-failed

### Dataset evaluation

A dataset of tickets can be evaluated as a group.

The dataset evaluation returns:

- total number of tickets
- passed tickets
- failed tickets
- schema validation failures
- business rule failures
- individual evaluation results

### Prediction evaluation

The project supports AI-style prediction evaluation.

A prediction contains:

ts { ticket: Ticket; expectedCategory: Ticket["category"]; predictedCategory: Ticket["category"]; }

This allows the project to compare the expected ticket category with the predicted category.

### Accuracy

Accuracy is calculated at dataset level.

It answers the question:

> How many predictions were correct out of all predictions?

Formula:

txt Accuracy = correct predictions / all predictions

Accuracy is useful, but it can be misleading when the dataset is imbalanced.

### Precision

Precision is calculated per category.

It answers the question:

> When the model predicted this category, how often was it correct?

Formula:

txt Precision = true positives / predicted positives

Example:

If the model predicted billing 4 times and only 2 of those predictions were actually billing, then precision for billing is:

txt 2 / 4 = 50%

### Recall

Recall is calculated per category.

It answers the question:

> Out of all tickets that actually belonged to this category, how many did the model find?

Formula:

txt Recall = true positives / actual positives

Example:

If there were 4 actual billing tickets and the model correctly found 2 of them, then recall for billing is:

txt 2 / 4 = 50%

### F1 Score

F1 Score combines precision and recall into one balanced metric.

Formula:

txt F1 = 2 _ (precision _ recall) / (precision + recall)

F1 Score is useful when both false positives and false negatives matter.

## Human-readable report

The project includes a terminal report for prediction evaluation.

Run:

bash npx tsx scripts/runPredictionEvaluation.ts

Example output:

txt AI Prediction Evaluation Report Dataset size: 3 Correct predictions: 2 Incorrect predictions: 1 Accuracy: 66.67% Per-label metrics: Category: billing Precision: 100.00% Recall: 50.00% F1 Score: 66.67% Category: technical Precision: 50.00% Recall: 100.00% F1 Score: 66.67%

This report shows why accuracy alone is not enough.

For example:

- billing has high precision but lower recall, which means the model is reliable when it predicts billing, but it misses some actual billing tickets.
- technical has high recall but lower precision, which means the model finds technical tickets well, but sometimes predicts technical incorrectly.

## Tech stack

- TypeScript
- Node.js
- Zod
- Vitest
- tsx

## Project structure

txt scripts/ runPredictionEvaluation.ts src/ ticketBusinessRules.ts ticketDatasetEvaluation.ts ticketEvaluation.ts ticketEvaluationErrors.ts ticketPrediction.ts ticketPredictionDatasetEvaluation.ts ticketPredictionEvaluation.ts ticketPredictionF1Score.ts ticketPredictionPrecision.ts ticketPredictionRecall.ts ticketSchema.ts test-data/ tickets.ts ticketPredictions.ts tests/ ticketBusinessRules.test.ts ticketDatasetEvaluation.test.ts ticketEvaluation.test.ts ticketPredictionDatasetEvaluation.test.ts ticketPredictionEvaluation.test.ts ticketPredictionF1Score.test.ts ticketPredictionPrecision.test.ts ticketPredictionRecall.test.ts ticketSchema.test.ts

## Installation

bash npm install

## Running tests

bash npm test

The project uses Vitest for automated testing.

You can also run tests in watch mode:

bash npm run test:watch

## Running the prediction report

bash npx tsx scripts/runPredictionEvaluation.ts

## Example workflow

The project follows this evaluation flow:

txt Ticket dataset ↓ Schema validation ↓ Business rule validation ↓ Prediction comparison ↓ Dataset-level accuracy ↓ Per-category precision, recall, and F1 score ↓ Human-readable report

## Why this project matters

In AI Quality Engineering, model output should not be trusted blindly.

A model can appear to perform well when measured only with accuracy, especially if the dataset is imbalanced.

For example:

txt 95 tickets are billing 5 tickets are technical

If a model always predicts billing, it can still reach 95% accuracy while completely failing to identify technical tickets.

That is why this project evaluates predictions using:

- accuracy
- precision
- recall
- F1 score

This gives a clearer view of model quality per category.

## What this project demonstrates

This project demonstrates practical understanding of:

- AI output evaluation
- structured output validation
- classification metrics
- dataset-based evaluation
- false positives and false negatives
- quality reporting
- edge case handling
- TypeScript typing
- automated testing
- separation of validation, evaluation, metrics, and reporting logic

## Current status

Completed:

- ticket schema validation
- business rule validation
- ticket evaluation
- ticket dataset evaluation
- prediction evaluation
- accuracy
- precision
- recall
- F1 score
- human-readable prediction report
- automated tests
- .gitignore and repository cleanup

## Roadmap

Planned next steps:

- expand the prediction dataset
- refactor report generation into a dedicated report module
- add tests for report formatting
- add a confusion matrix
- add macro and weighted averages
- add quality gates based on metric thresholds
- add GitHub Actions for CI
- explore Langfuse basics
- explore Phoenix basics
- connect the project to broader AI Quality and AI Governance concepts

## Career relevance

This project is aligned with roles such as:

- QA Lead
- Quality Engineering Manager
- AI Quality Engineer
- AI Quality Lead
- Quality Governance Lead

It focuses on the quality layer around AI systems rather than model training.

The goal is to show how QA and Quality Engineering practices can be applied to AI outputs through validation, metrics, testing, and reporting.
