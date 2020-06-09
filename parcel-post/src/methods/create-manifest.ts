import {
  NewManifest,
  ManifestConfirmationPOJO,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { apiClient } from "../mock-api/client";
import {
  CreateManifestRequest,
  CreateManifestResponse,
} from "../mock-api/create-manifest";
import { Session } from "./session";

/**
 * Creates an end-of-day manifest
 */
export default async function createManifest(
  transaction: Transaction<Session>,
  manifest: NewManifest
): Promise<ManifestConfirmationPOJO> {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects
  let data: CreateManifestRequest = {
    operation: "create_manifest",
    session_id: transaction.session.id,
    shipFrom: manifest.shipFrom,
    openDateTime: manifest.openDateTime,
    closeDateTime: manifest.closeDateTime,
    shipments: [{ trackingNumber: "test" }],
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<CreateManifestResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatShipment(response.data);
}

/**
 * Formats a shipment in the way ShipEngine expects
 */
function formatShipment(
  response: CreateManifestResponse
): ManifestConfirmationPOJO {
  return {
    manifests: [
      {
        id: response.id,
        identifiers: [],
      },
    ],
  };
}
