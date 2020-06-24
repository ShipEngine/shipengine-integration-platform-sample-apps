import { HttpRequest } from "./client";

export interface RetrieveSellerRequest {
  operation: "retrieve_seller";
  seller_id: string;
}

export interface RetrieveSellerResponse {
  id: string;
  contact_information: {
    first_name: string;
    last_name: string;
    email: string;
    phoneNumber: string;
  };
  store_id: string;
  name: string;
  seller_warehouses: {
    id: string;
    name: string;
    address: {
      business_name: string;
      lines: string[];
      city: string;
      state: string;
      postalCode: string;
      country: string;
      timeZone: string;
    },
  }[]
}

/**
 * This is a mock implementation of an order source's API that retrieves Seller information.
 */
export function retrieveSeller(request: HttpRequest & RetrieveSellerRequest): RetrieveSellerResponse {

  return {
    id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    contact_information: {
      first_name: "John",
      last_name: "Doe",
      email: "john_doe@gmail.com",
      phoneNumber: "123-456-7890"
    },
    store_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    name: "Warehouse Inc. LLC",
    seller_warehouses: [
      {
        id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
        name: "Warehouse A",
        address: {
          business_name: "Warehouse Inc. LLC #1",
          lines: ["4450 E Palm Valley Blvd", "Bldg B", "Ste100"],
          city: "Round Rock",
          state: "Texas",
          postalCode: "78665",
          country: "US",
          timeZone: "America/Chicago"
        }
      }
    ]
  }
}
