"use strict";

const apiClient = require('./api/client');

/**
 * Cancels one or more shipments.
 */
async function cancelShipments(transaction, shipmentCancellations) {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects
  const data = {
    session_id: transaction.session.id,
    cancellations: shipmentCancellations.map((cancellation) => {
      return {
        id: cancellation.cancellationID,
        tracking_number: cancellation.trackingNumber,
        internal_id: cancellation.identifiers.internalReferenceID
      };
    }),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient('carrier').post('/label/cancel', data);

  // STEP 4: Create the output data that ShipEngine Connect expects
  return formatCancellationResponse(response.data);
}

/**
 * Formats shipment cancellations in the way ShipEngine Connect expects.
 */
function formatCancellationResponse(response) {
  return response.map((cancellation) => {
    const status = ((status) => {
      switch (status) {
        case 'COMPLETE':
          return 'success';
        case 'FAILED':
          return 'error';
        default:
          throw new Error('Status unknown.');
      }
    })(cancellation.status);

    return {
      cancellationID: cancellation.id,
      status: status,
      code: cancellation.code,
      description: cancellation.description,
      notes: cancellation.note ? [{ type: 'message_to_buyer', text: cancellation.note }] : undefined,
      metadata: {},
    };
  });
}

module.exports = cancelShipments;
