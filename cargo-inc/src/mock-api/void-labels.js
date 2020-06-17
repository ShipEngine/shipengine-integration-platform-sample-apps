"use strict";

const data = [
  {
    status: "COMPLETE",
    code: "AC",
    description: "Cancellation is complete.",
    notes: ""
  },
  {
    status: "FAILED",
    code: "FA",
    description: "Cancellation failed.",
    notes: "Please call ###-###-### to cancel."
  }
]

/**
 * This is a mock implementation of a carrier"s API that voids one or more labels
 */
function voidLabels(request) {
  return {
    canceledShipments: request.cancellations.map((cancellation) => {
      const { cancellationID } = cancellation;
      const { status, code, description, notes } = data[Math.floor(Math.random() * data.length)];

      return {
        id: cancellationID,
        cancellationStatus: status,
        cancellationCode: code,
        cancellationDescription: description,
        cancellationNotes: notes,
        cancellationConfirmation: Buffer.from(new Date().toISOString()).toString(
          "base64"
        ),
      };
    })
  }
}

module.exports = voidLabels;
