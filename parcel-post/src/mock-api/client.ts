import axios from "axios";
import { authenticate, AuthenticateRequest } from "./authenticate";
import { createManifest, CreateManifestRequest } from "./create-manifest";
import { generateLabel, GenerateLabelRequest } from "./generate-label";
import { pickUp, PickUpRequest } from "./pick-up";
import {
  pickUpCancellation,
  PickUpCancellationRequest,
} from "./pick-up-cancellation";
import { quoteRates, QuoteRatesRequest } from "./quote-rates";

// Read config values from environment variables
const API_URL = process.env.API_URL || "https://httpbin.org/anything";
const API_TIMEOUT = Number.parseInt(process.env.API_TIMEOUT || "5000");
const API_KEY = process.env.API_KEY || "";

export interface HttpRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  origin: string;
  [key: string]: unknown;
}

// Create an API client, configured via environment variables
export const apiClient = axios.create({
  method: "post",
  url: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "API-Key": API_KEY,
  },
  transformResponse(data) {
    data = JSON.parse(data);

    // HttpBin echoes back the request data
    let request: HttpRequest = {
      method: data.method,
      url: data.url,
      headers: data.headers,
      origin: data.origin,
      ...data.json,
    };

    switch (request.operation) {
      case "authenticate":
        return authenticate(request as HttpRequest & AuthenticateRequest);

      case "create_manifest":
        return createManifest(request as HttpRequest & CreateManifestRequest);

      case "generate_label":
        return generateLabel(request as HttpRequest & GenerateLabelRequest);

      case "quote_rates":
        return quoteRates(request as HttpRequest & QuoteRatesRequest);

      case "pick_up":
        return pickUp(request as HttpRequest & PickUpRequest);

      case "pick_up_cancellation":
        return pickUpCancellation(
          request as HttpRequest & PickUpCancellationRequest
        );
    }
  },
});
