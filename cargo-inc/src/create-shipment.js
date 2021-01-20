"use strict";

const axios = require('axios');

const apiClient = require('./api/client');

// The packaging ID for a customer's own packaging
const OWN_PACKAGING = '03318192-3e6c-475f-a496-a4f17c1dbcae';

/**
 * Generates a shipping label and tracking number for a shipment
 */
async function createShipment(transaction, shipment) {
  // STEP 1: Validation
  for (let parcel of shipment.packages) {
    if (parcel.packaging.id === OWN_PACKAGING && parcel.weight.grams > 100000) {
      throw new Error(`${parcel.packaging.name} cannot weigh more than 100 kilograms`);
    }
  }

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    session_id: transaction.session.id,
    service_code: shipment.deliveryService.code,
    ship_date: shipment.shipDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.package.weight.ounces,
  };

  if (shipment.deliveryConfirmation) {
    data.confirmation_code = shipment.deliveryConfirmation.code;
  }

  // STEP 3: Call the carrier's API
  const response = await apiClient('carrier').post('/label/create', data);

  // STEP 4: Create the output data that ShipEngine Connect expects
  return await formatShipment(response.data);
}

/**
 * Formats a shipment in the way ShipEngine Connect expects
 */
async function formatShipment(response) {
  return {
    trackingNumber: response.tracking_number,
    deliveryDateTime: response.delivery_date,
    label: {
      name: 'Label',
      type: 'label',
      size: 'letter',
      format: 'pdf',
      data: Buffer.from(response.image, 'base64')
    },
    charges: [
      {
        type: 'shipping',
        amount: {
          value: response.shipment_cost,
          currency: 'USD'
        }
      },
      {
        type: 'delivery_confirmation',
        amount: {
          value: response.confirmation_cost,
          currency: 'USD'
        }
      },
      {
        type: 'location_fee',
        amount: {
          value: response.location_cost,
          currency: 'USD'
        }
      },
    ],
    packages: [{
      trackingNumber: response.tracking_number,
    }],
  };
}

module.exports = createShipment;
