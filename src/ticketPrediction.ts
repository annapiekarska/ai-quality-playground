import { Ticket } from "./ticketSchema";

export type TicketPrediction = {
  ticket: Ticket;
  expectedCategory: Ticket["category"];
  predictedCategory: Ticket["category"];
};
