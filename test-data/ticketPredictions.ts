import { validTicket } from "./tickets";
import type { TicketPrediction } from "../src/ticketPrediction";

export const ticketPredictions: TicketPrediction[] = [
  {
    ticket: validTicket,
    expectedCategory: "billing",
    predictedCategory: "billing",
  },
  {
    ticket: validTicket,
    expectedCategory: "billing",
    predictedCategory: "technical",
  },
  {
    ticket: validTicket,
    expectedCategory: "technical",
    predictedCategory: "technical",
  },
];
