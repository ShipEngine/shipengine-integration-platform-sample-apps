"use strict";

const apiClient = require("./mock-api/client");

async function cancelShipments(transaction, shipmentCancellations) {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "void_labels",
    session_id: transaction.session.id,
    cancellations: shipmentCancellations.map((cancellation) => {
      const { cancellationID, trackingNumber } = cancellation;
      return {
        cancellationID: cancellationID,
        internalReferenceID: cancellation.identifiers.internalReferenceID,
        trackingNumber: trackingNumber,
      };
    }),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return await formatCancellationResponse(response.data);
}

/**
 * Formats a shipment in the way ShipEngine expects
 */
async function formatCancellationResponse(response) {
  return response.canceledShipments.map((c) => {
    const status = ((status) => {
      switch (status) {
        case "COMPLETE":
          return "success";
        case "FAILED":
          return "error";
        default:
          throw new Error("status unkown");
      }
    })(c.cancellationStatus);

    return {
      cancellationID: c.id,
      status: status,
      code: c.cancellationCode,
      description: c.cancellationDescription,
      notes: c.cancellationNotes,
      metadata: {},
    };
  });
}

module.exports = cancelShipments;
