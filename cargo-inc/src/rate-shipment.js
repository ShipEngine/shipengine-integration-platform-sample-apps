"use strict";

const apiClient = require("./api/client");

/**
 * Generates shipping rates for a shipment
 */
async function rateShipment(transaction, shipment) {
  // STEP 1: Validation
  // TODO: add any validation logic here

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    session_id: transaction.session.id,
    ship_date: shipment.shipDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages[0].weight.ounces,
  };

  if(shipment.deliveryService) {
    data.service_code = shipment.deliveryService.code;
  }

  // TODO: re-write the code to handle multiple package codes
  if(shipment.packages.length > 0) {
    data.parcel_codes = shipment.packages
      .map(packages => packages.packaging && packages.packaging.code)
      .filter(packageCodes => packageCodes !== undefined);
  }

  if(shipment.deliveryConfirmation) {
    data.confirmation_code = shipment.deliveryConfirmation.code;
  }

  if(shipment.deliveryDateTime) {
    data.delivery_date = shipment.deliveryDateTime.toISOString();
  }

  // STEP 3: Call the carrier's API
  const response = await apiClient('carrier').post('/shipment/rates', data);

  // STEP 4: Create the output data that ShipEngine Connect expects
  return response.data.map(formatRate);
}

/**
 * Formats a rate quote in the way ShipEngine Connect expects
 */
function formatRate(rate) {
  return {
    deliveryService: rate.service_code,
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    isTrackable: rate.service_code !== "ECO",
    deliveryConfirmation: rate.confirmation_code,
    packages: [{
      packaging: rate.parcel_code,
    }],
    charges: [
      {
        name: "Service Charge",
        type: "shipping",
        amount: {
          value: rate.shipment_cost,
          currency: "USD"
        }
      },
      {
        name: "Confirmation Fee",
        type: "delivery_confirmation",
        amount: {
          value: rate.confirmation_cost,
          currency: "USD"
        }
      },
      {
        name: "Transport Tax",
        type: "tax",
        amount: {
          value: rate.tax_cost,
          currency: "USD"
        }
      },
    ],
  };
}

module.exports = rateShipment;
