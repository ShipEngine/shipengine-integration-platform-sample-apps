import { Transaction, SellerIdentifier, SellerPOJO } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Logs in using the username and password entered on the login form
 */
export default async function getSeller(
  transaction: Transaction<Session>,
  seller: SellerIdentifier,
): Promise<SellerPOJO> {
  // throw new Error("NotImplementedError");

  return {
    id: "12335",
    store: {
      id: "123456",
      name: "A Store"
    }
  }

  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // Step 4: Create the output data that ShipEngine expects
  // which is persisted across all method calls
  // transaction.session = {};
}
