import { HttpRequest } from "./client";

export interface CreateShipmentRequest {
  operation: "create_shipment";
  shipment_id: string;
}


/**
 * This is a mock implementation of an order source's API that retrieves Seller information.
 */
export function createShipment(request: HttpRequest & CreateShipmentRequest): void {

  // Send notification

}
