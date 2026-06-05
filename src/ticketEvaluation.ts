import { TicketSchema } from "./ticketSchema";
import { TicketBusinessRules } from "./ticketBusinessRules";
import {
  SCHEMA_VALIDATION_FAILED,
  BUSINESS_RULE_VALIDATION_FAILED,
} from "./evaluationErrors";

export type EvaluationResult = {
  valid: boolean;
  errors: string[];
};

export const evaluateTicket = (ticket: unknown): EvaluationResult => {
  const schemaValidationResult = TicketSchema.safeParse(ticket);

  if (!schemaValidationResult.success) {
    return {
      valid: false,
      errors: [SCHEMA_VALIDATION_FAILED],
    };
  }

  const businessValidationResult = TicketBusinessRules.validate(
    schemaValidationResult.data,
  );
  if (!businessValidationResult) {
    return {
      valid: false,
      errors: [BUSINESS_RULE_VALIDATION_FAILED],
    };
  }

  return {
    valid: true,
    errors: [],
  };
};
