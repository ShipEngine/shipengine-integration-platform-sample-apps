import { Transaction, SalesOrderShipment } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";
import { apiClient } from "../mock-api/client";

/**
 * Logs in using the username and password entered on the login form
 */
export default async function shipmentCancelled(
  transaction: Transaction<Session>,
  shipment: SalesOrderShipment,
): Promise<void> {
  // STEP 1: Validation
  // Add any desired validation here
  
  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "cancel_shipment",
    session_id: transaction.session.id,
    cancelled_shipment_id: shipment.trackingNumber
  };

  // STEP 3: Call the order source's API
  await apiClient.request({ data });
}
