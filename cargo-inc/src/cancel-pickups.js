'use strict';

const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');

const apiClient = require('./api/client');

const sameDayPath = path.join(__dirname, '..', 'pickup-services', 'same-day.yaml');
const sameDayPickup = yaml.safeLoad(fs.readFileSync(sameDayPath, 'utf8'));

/**
 * Cancels one or more previously-scheduled pickups.
 */
async function cancelPickups(transaction, pickups) {

  let data = {
    scheduled_pick_ups: pickups.map((pickup) => {
      // STEP 1: Validation
      if (pickup.pickupService.id === sameDayPickup.id) {
        throw new Error('Same-day pickups cannot be canceled.');
      }

      // STEP 2: Create the data that the carrier's API expects
      return {
        session_id: transaction.session.id,
        pick_up_id: pickup.id,
        service_code: pickup.pickupService.code,
        reference: pickup.reason,
      };
    })
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient('carrier').post('/pickup/cancel', data);

  // STEP 4: Create the output data that ShipEngine Connect expects
  return response.data.canceled_pick_ups.map((cancellation, index) => {
    if (cancellation.error) {
      return {
        cancellationID: pickups[index].cancellationID,
        confirmationNumber: cancellation.id,
        status: 'error',
        notes: [
          {
            type: 'message_to_buyer',
            text: cancellation.reason,
          }
        ],
      };
    }
    else {
      return {
        cancellationID: pickups[index].cancellationID,
        confirmationNumber: cancellation.id,
        status: 'success',
        notes: [
          {
            type: 'message_to_buyer',
            text: `Pickup ${pickups[index].id} was canceled successfully.`
          }
        ]
      };
    }
  });
}

module.exports = cancelPickups;
