import * as fs from "fs";
import * as path from "path";
import { HttpRequest } from "./client";

export interface CreateManifestRequest {
  operation: "create_manifest";
  session_id: string;
}

export interface CreateManifestResponse {
  id: string;
}

/**
 * This is a mock implementation of a carrier's API that creates a manifest
 */
export function createManifest(
  request: HttpRequest & CreateManifestRequest
): CreateManifestResponse {
  let shipDate = new Date(request.ship_date);
  let weight = request.total_weight;
  let zone = request.to_zone;

  return {
    tracking_number: Buffer.from(new Date().toISOString())
      .toString("base64")
      .toUpperCase(),
    delivery_date: new Date(
      shipDate.setDate(shipDate.getDate() + 4)
    ).toISOString(),
    shipment_cost: 0.97 * weight,
    confirmation_cost: 1.26,
    location_cost: 0.000012 * zone,
    image: fs
      .readFileSync(path.join(__dirname, "sample-label.pdf"))
      .toString("base64"),
  };
}
