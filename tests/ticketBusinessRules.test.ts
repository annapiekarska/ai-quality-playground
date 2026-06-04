import { describe, expect, test } from "vitest";
import { TicketBusinessRules } from "../src/ticketBusinessRules";
import { validTicket } from "../test-data/tickets";
import { Ticket } from "../src/ticketSchema";

describe("TicketBusinessRules", () => {
  test("high urgency without human review fails business validation", () => {
    const ticket: Ticket = {
      ...validTicket,
      urgency: "high",
      needsHumanReview: false,
    };
    expect(TicketBusinessRules.validate(ticket)).toBe(false);
  });
  test("high urgency with human review passes business validation", () => {
    const ticket: Ticket = {
      ...validTicket,
      urgency: "high",
      needsHumanReview: true,
    };
    expect(TicketBusinessRules.validate(ticket)).toBe(true);
  });
});
