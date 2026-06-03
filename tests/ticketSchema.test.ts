import { describe, expect, test } from "vitest";
import { TicketSchema } from "../src/ticketSchema";

const validTicket = {
  category: "billing",
  urgency: "high",
  summary: "Customer was charged twice.",
  needsHumanReview: true,
};

const invalidTicket = {
  category: "payment",
  urgency: "high",
  summary: "Customer was charged twice.",
  needsHumanReview: true,
};

describe("TicketSchema", () => {
  test("valid ticket passes schema validation", () => {
    expect(() => TicketSchema.parse(validTicket)).not.toThrow();
  });
  test("invalid category fails schema validation", () => {
    expect(() => TicketSchema.parse(invalidTicket)).toThrow();
  });
});
