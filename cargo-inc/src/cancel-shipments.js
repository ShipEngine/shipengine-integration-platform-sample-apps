"use strict";

const apiClient = require("./mock-api/client");

async function cancelShipments(transaction, shipmentCancelations) {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects

  let data = {
    operation: "void_labels",
    session_id: transaction.session.id,
    cancelations: shipmentCancelations.map((cancelation) => {
      const { cancellationID, trackingNumber } = cancelation;
      return {
        cancellationID: cancellationID,
        internalReferenceID: cancelation.identifiers.internalReferenceID,
        trackingNumber: trackingNumber,
      };
    }),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  const foo = await formatCancellationResponse(response.data);

  return foo;
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
    })(c.status);

    return {
      cancellationID: c.id,
      status: c.cancelationStatus,
      confirmation: c.cancelationConfirmation,
      code: c.cancelationCode,
      description: c.cancelationDescription,
      notes: c.cancelationNotes,
      metadata: {},
    };
  });
}

module.exports = cancelShipments;
