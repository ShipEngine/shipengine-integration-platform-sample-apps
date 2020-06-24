import { HttpRequest } from "./client";

export interface RetrieveSalesOrderRequest {
  operation: "retrieve_sales_order";
  sales_order_id: string;
  session_id: string;
}

export interface RetrieveSalesOrderResponse {
  id: string;
  created_at: string;
  status: string;
  payment: {
    status: string;
    method: string;
  },
  address: {
    business_name: string;
    lines: string[];
    city: string;
    state: string;
    postalCode: string;
    country: string;
    time_zone: string;
  },
  seller_id: string;
  buyer: {
    id: string;
    name: string;
  },
  shipping_info: {
    confirmation_type: string;
    delivery_date: string;
  },
  shipping_items: {
    id: string;
    name: string;
    quantity: number;
    price_per_unit: number,
  }[],
  shipping_notes: string;
}

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
export function retrieveSalesOrder(request: HttpRequest & RetrieveSalesOrderRequest): RetrieveSalesOrderResponse {

  return {
    id: request.sales_order_id,
    created_at: new Date().toISOString(),
    status: "awaiting_status",
    payment: {
      status: "in_process",
      method: "credit_card"
    },
    address: {
      business_name: "John Doe Business Name",
      lines: ["4450 E Palm Valley Blvd", "Bldg B", "Ste100"],
      city: "Round Rock",
      state: "Texas",
      postalCode: "78665",
      country: "US",
      time_zone: "America/Chicago"
    },
    seller_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    buyer: {
      id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      name: "John Doe"
    },
    shipping_info: {
      confirmation_type: "signature",
      delivery_date: new Date().toISOString(),
    },
    shipping_items: [
      {
        id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
        name: "Item 1",
        quantity: 2,
        price_per_unit: 10
      },
      {
        id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
        name: "Item 2",
        quantity: 4,
        price_per_unit: 2
      }
    ],
    shipping_notes: "Please ring doorbell during dropoff"
  }
}
