import { describe, expect, test } from "vitest";
import { TicketSchema } from "../src/ticketSchema";
import {
  validTicket,
  invalidTicket,
  businessRuleViolationTicket,
} from "../test-data/tickets";

describe("TicketSchema", () => {
  test("valid ticket passes schema validation", () => {
    expect(() => TicketSchema.parse(validTicket)).not.toThrow();
  });
  test("invalid category fails schema validation", () => {
    const invalidTicketCategory = { ...validTicket, category: "payment" };
    expect(() => TicketSchema.parse(invalidTicketCategory)).toThrow();
  });
  test("summary containing only whitespace fails schema validation", () => {
    const ticketWithWhitespaceSummary = { ...validTicket, summary: "     " };
    expect(() => TicketSchema.parse(ticketWithWhitespaceSummary)).toThrow();
  });
  test("invalid urgency fails schema validation", () => {
    const invalidTicketUrgency = { ...validTicket, urgency: "urgent" };
    expect(() => TicketSchema.parse(invalidTicketUrgency)).toThrow();
  });
});
