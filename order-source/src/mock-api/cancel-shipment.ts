import { HttpRequest } from "./client";

export interface CancelShipmentRequest {
  operation: "cancel_shipment";
  shipment_id: string;
}


/**
 * This is a mock implementation of an order source's API that retrieves Seller information.
 */
export function cancelShipment(request: HttpRequest & CancelShipmentRequest): void {

  // Send notification

}
