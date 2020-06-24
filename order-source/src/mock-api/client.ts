import axios from "axios";
import { authenticate, AuthenticateRequest } from "./authenticate";
import { retrieveSeller, RetrieveSellerRequest } from "./retrieve-seller";


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
    "API-Key": API_KEY
  },
  transformResponse(data) {
    data = JSON.parse(data);

    // HttpBin echoes back the request data
    let request: HttpRequest = {
      method: data.method,
      url: data.url,
      headers: data.headers,
      origin: data.origin,
      ...data.json
    };

    switch (request.operation) {
      case "authenticate":
        return authenticate(request as HttpRequest & AuthenticateRequest);
      
      case "get_sales_order":
        return ;
      
      case "retrieve_seller":
        return retrieveSeller(request as HttpRequest & RetrieveSellerRequest);
    }
  }
});
