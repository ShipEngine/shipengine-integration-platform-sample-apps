import { Transaction, SalesOrderShipment } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";
import { apiClient } from "../mock-api/client";

/**
 * Logs in using the username and password entered on the login form
 */
export default async function shipmentCreated(
  transaction: Transaction<Session>,
  shipment: SalesOrderShipment,
): Promise<void> {
  // STEP 1: Validation
  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "create_shipment",
    session_id: transaction.session.id,
    shipment_id: shipment.trackingNumber
  };
  // STEP 3: Call the order source's API
  await apiClient.request({ data });
}
