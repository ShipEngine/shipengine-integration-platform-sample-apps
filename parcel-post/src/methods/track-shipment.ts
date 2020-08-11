import { apiClient } from "../mock-api/client";
import { Session } from "./session";
import { Transaction, TrackingInfo, TrackingCriteria, ShipmentStatus } from "@shipengine/integration-platform-sdk";
import { LocationHistoryResponse, LocationHistoryRequest } from "../mock-api/location-history";

export default async function trackShipment(
  transaction: Transaction<Session>, trackingCriteria: TrackingCriteria): Promise<TrackingInfo> {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier"s API expects

  const { trackingNumber, returns } = trackingCriteria;

  const data: LocationHistoryRequest = {
    operation: "location_history",
    trackingNumber,
    isReturn: returns.isReturn
  };

  // STEP 3: Call the carrier"s API
  const response = await apiClient.request<LocationHistoryResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatTrackingResponse(response.data);

}

/**
 * Formats a shipment in the way ShipEngine expects
 */
function formatTrackingResponse(response): TrackingInfo {

  return {
    deliveryDateTime: response.deliveryDate,
    packages: [
      {
        packaging: {
          id: "03318192-3e6c-475f-a496-a4f17c1dbcae",
        },
        dimensions: {
          length: response.packages[0].length,
          width: response.packages[0].width,
          height: response.packages[0].height,
          unit: response.packages[0].dimUnit,
        },
        weight: {
          value: response.packages[0].weight,
          unit: response.packages[0].weightUnit,
        }
      }
    ],
    events: [
      {
        name: response.trackingEvents[0].description,
        dateTime: response.deliveryDate,
        status: mapStatusCodes(response.trackingEvents[0].statusCode),
        isError: (response.trackingEvents[0].length == 0 ? false : true),
        code: response.trackingEvents[0].statusCode,
        description: response.trackingEvents[0].description,
        address: {
          company: response.trackingEvents[0].companyName,
          addressLines: [response.trackingEvents[0].addressLine1],
          cityLocality: response.trackingEvents[0].city,
          stateProvince: response.trackingEvents[0].state,
          postalCode: response.trackingEvents[0].zip,
          country: response.trackingEvents[0].country,
          isResidential: (response.trackingEvents[0].addressType == "residential" ? true : false),
        },
        signer: {
          title: response.signedBy.salutation,
          given: response.signedBy.firstName,
          middle: response.signedBy.middleName,
          family: response.signedBy.lastName,
          suffix: response.signedBy.suffix
        },
        notes: response.notes
      }
    ]
  }
}

function mapStatusCodes(statusCodes): ShipmentStatus {

  switch(statusCodes) {
    case "NY":
      return ShipmentStatus.Accepted;
    case "C":
      return ShipmentStatus.Delivered;
    case "IT":
      return ShipmentStatus.InTransit;
  }
}
