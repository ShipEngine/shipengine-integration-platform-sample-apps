const ONE_HOUR = 1000 * 60 * 60;
const ONE_DAY = ONE_HOUR * 24;

/**
 * This is a mock implementation of a carrier's API that cancels a previously-scheduled pickup
 */
function pickUpCancellation(request) {
  return {
    canceled_pick_ups: request.scheduled_pick_ups.map((pickUp) => {
      let pickupID = pickUp.pick_up_id;
      let serviceCode = pickUp.service_code;

      // Randomly decide whether the cancellation is successful or not
      if (Date.now() % 2 === 0) {
        // Successful cancellation
        return {
          id: pickupID,
        };
      }
      else {
        // Failed cancellation
        return {
          id: pickupID,
          error: true,
          reason: `${serviceCode} must be cancelled by phone. Please call 1-800-555-5555`,
        };
      }
    })
  };
}

module.exports = {
  pickUpCancellation,
  ONE_HOUR,
  ONE_DAY
}
