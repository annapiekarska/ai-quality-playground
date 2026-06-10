# AI Quality Playground

AI Quality Playground is a TypeScript-based portfolio project focused on evaluating AI-style classification outputs from a Quality Engineering perspective.

The project does not train a model. Instead, it evaluates prediction quality using common classification metrics, generates a readable evaluation report, and applies a configurable quality gate that can block CI when quality thresholds are not met.

## Why this project exists

This project demonstrates how QA and Quality Engineering practices can be applied to AI-assisted or AI-driven systems.

It focuses on:

- evaluating prediction quality
- validating classification outputs
- reporting model performance
- comparing per-category and aggregate metrics
- applying quality gates
- running automated checks in CI

## Current features

- Ticket schema validation
- Business rule validation
- Single ticket evaluation
- Dataset-level evaluation
- AI prediction evaluation
- Accuracy
- Precision
- Recall
- F1 Score
- Macro average
- Weighted average
- Confusion matrix
- Human-readable prediction evaluation report
- Configurable prediction quality gate
- GitHub Actions CI pipeline

## Metrics included

### Accuracy

Measures how many predictions were correct overall.

### Precision

Answers the question:

> When the model predicted a given category, how often was it correct?

### Recall

Answers the question:

> Of all true cases for a given category, how many did the model correctly find?

### F1 Score

Combines precision and recall into one balanced metric.

### Macro average

Calculates the average score across categories, treating each category equally.

This helps identify whether the model performs consistently across all categories, including smaller ones.

### Weighted average

Calculates the average score across categories while weighting each category by the number of true cases in the dataset.

This helps understand overall performance based on real data volume.

### Confusion matrix

Shows how expected categories were mapped to predicted categories.

Example:

```text
billing -> technical: 1
```

means that one ticket that should have been classified as `billing` was predicted as `technical`.

## How to run the project

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run the prediction evaluation report:

```bash
npm run evaluate
```

Run the prediction quality gate:

```bash
npm run quality:gate
```

## Example evaluation report

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

Macro average:
Precision: 50.00%
Recall: 50.00%
F1 Score: 49.05%

Weighted average:
Precision: 50.00%
Recall: 50.00%
F1 Score: 49.14%

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

## Prediction quality gate

The project includes a configurable quality gate that evaluates whether prediction quality meets minimum thresholds.

The quality gate checks:

- minimum accuracy
- minimum macro F1 score
- minimum weighted F1 score

Example output:

```text
AI Prediction Quality Gate
Accuracy: 50.00%
Macro F1 Score: 49.05%
Weighted F1 Score: 49.14%
Passed: true
```

If any metric falls below the configured threshold, the quality gate fails and exits with an error code.

This makes it possible to block CI when prediction quality drops below acceptable levels.

## CI/CD

The project uses GitHub Actions to automatically run:

- automated tests
- prediction quality gate

The CI workflow runs on push and pull request.

## Quality Engineering value

This project demonstrates:

- AI output evaluation
- classification quality metrics
- automated quality reporting
- quality gates
- CI-based quality enforcement
- QA-to-AI Quality Engineering transition skills

## Roadmap

Completed in v1:

- Accuracy
- Precision
- Recall
- F1 Score
- Macro average
- Weighted average
- Confusion matrix
- Evaluation report
- Quality gate
- GitHub Actions CI

Possible future improvements:

- Add JSON report output
- Add HTML report output
- Add larger and more realistic datasets
- Add severity-based quality gates
- Add executive summary reporting
- Add model comparison support
