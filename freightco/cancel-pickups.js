"use strict";

const apiClient = require("./mock-api/client");
const sameDayPickup = require("./pickup-services/same-day");

/**
 * Cancels one or more previously-scheduled pickups
 */
async function cancelPickups(transaction, pickups) {

  let data = {
    operation: "pick_up_cancellation",
    scheduled_pick_ups: pickups.map((pickup) => {
      // STEP 1: Validation
      if (pickup.pickupService.id === sameDayPickup.id) {
        throw new Error(`Same-day pickups cannot be canceled`);
      }

      // STEP 2: Create the data that the carrier's API expects
      return {
        session_id: transaction.session.id,
        pick_up_id: pickup.id,
        service_code: pickup.pickupService.identifiers.apiCode,
        zone: Number.parseInt(pickup.address.postalCode),
        reference: pickup.reason,
      };
    })
  };

  // STEP 3: Call the carrier's API
  let response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return response.data.canceled_pick_ups.map((cancellation, index) => {
    if (cancellation.error) {
      return {
        cancellationID: pickups[index].cancellationID,
        confirmationNumber: cancellation.id,
        status: "error",
        notes: [
          {
            type: "error",
            text: cancellation.reason,
          }
        ],
      };
    }
    else {
      return {
        cancellationID: pickups[index].cancellationID,
        confirmationNumber: cancellation.id,
        status: "success",
        notes: `Pickup ${pickups[index].id} was canceled successfully`,
      };
    }
  });
}

module.exports = cancelPickups;