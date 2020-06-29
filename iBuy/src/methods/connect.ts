import { Transaction } from "@shipengine/integration-platform-sdk";
import { AuthenticateRequest, AuthenticateResponse } from "../mock-api/authenticate";
import { apiClient } from "../mock-api/client";
import { Session } from "./session";

interface ConnectionFormData {
  account_id: string;
  account_email: string;
  account_password: string;
  agree_to_eula: boolean;
  eula: string;
}

/**
 * Logs in using the username and password entered on the login form
 */
export default async function connect(
  transaction: Transaction<Session>, connectionFormData: ConnectionFormData): Promise<void> {

  // STEP 1: Validation
  if (!connectionFormData.agree_to_eula) {
    throw new Error(`You must agree to the terms and conditions`);
  }

  // STEP 2: Create the data that the carrier's API expects
  let data: AuthenticateRequest = {
    operation: "authenticate",
    ...connectionFormData,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<AuthenticateResponse>({ data });

  // STEP 4: Store session data in the transaction.session property,
  // which is persisted across all method calls
  transaction.session = {
    id: response.data.id,
    ip: response.data.ip,
    created: response.data.created,
    language: response.data.language,
  };
}
