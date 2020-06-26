const apiClient = require("../mock-api/client");

/**
 * Logs in using the username and password entered on the login form
 */
async function shipmentCancelled(transaction, shipment) {
  // STEP 1: Validation
  // Add any desired validation here
  
  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "cancel_shipment",
    session_id: transaction.session.id,
    cancelled_shipment_id: shipment.trackingNumber
  };

  // STEP 3: Call the order source's API
  await apiClient.request({ data });
}

module.exports = shipmentCancelled