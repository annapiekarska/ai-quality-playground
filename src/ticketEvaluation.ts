import { TicketSchema } from "./ticketSchema";
import { TicketBusinessRules } from "./ticketBusinessRules";

export const evaluateTicket = (ticket: unknown) => {
  const schemaValidationResult = TicketSchema.safeParse(ticket);

  if (!schemaValidationResult.success) {
    return {
      valid: false,
      errors: ["schema-validation-failed"],
    };
  }

  const businessValidationResult = TicketBusinessRules.validate(
    schemaValidationResult.data,
  );
  if (!businessValidationResult) {
    return {
      valid: false,
      errors: ["business-rule-validation-failed"],
    };
  }

  return {
    valid: true,
    errors: [],
  };
};
