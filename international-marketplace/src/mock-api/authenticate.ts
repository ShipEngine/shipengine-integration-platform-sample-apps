import { HttpRequest } from "./client";

export interface AuthenticateRequest {
  operation: "authenticate";
  account_id: string;
  account_email: string;
  account_password: string;
  agree_to_eula: boolean;
  eula: string;
}

export interface AuthenticateResponse {
  id: string;
  ip: string;
  created: string;
  language: string;
}

/**
 * This is a mock implementation of a carrier's API that authenticates a user and initiates a session
 */
export function authenticate(request: HttpRequest & AuthenticateRequest): AuthenticateResponse {
  let { account_id, account_password } = request;

  return {
    id: Buffer.from(`${account_id}${account_password}${Math.random()}`).toString("base64"),
    ip: request.origin,
    created: new Date().toISOString(),
    language: request.headers["Accept-Language"] || "en-US",
  };
}
