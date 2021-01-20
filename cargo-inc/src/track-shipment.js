"use strict";

const apiClient = require('./api/client');

async function trackShipment(transaction, trackingCriteria) {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier"s API expects
  const data = {
    tracking_number: trackingCriteria.trackingNumber,
    is_return: trackingCriteria.returns.isReturn
  };

  // STEP 3: Call the carrier"s API
  const response = await apiClient('carrier').post('/shipment/track', data);

  // STEP 4: Create the output data that ShipEngine Connect expects
  return formatTrackingResponse(response.data);
}

/**
 * Formats a shipment in the way ShipEngine Connect expects
 */
function formatTrackingResponse(response) {
  return {
    trackingNumber: response.tracking_number,
    deliveryDateTime: response.delivery_date,
    packages: [
      {
        packaging: {
          id: '03318192-3e6c-475f-a496-a4f17c1dbcae',
          description: response.packages[0].description,
          requiresWeight: true,
          requiresDimensions: false
        },
        dimensions: {
          length: response.packages[0].length,
          width: response.packages[0].width,
          height: response.packages[0].height,
          unit: response.packages[0].dim_unit,
        },
        weight: {
          value: response.packages[0].weight,
          unit: response.packages[0].weight_unit,
        }
      }
    ],
    events: [
      {
        name: response.tracking_events[0].description,
        dateTime: response.delivery_date,
        status: mapStatusCodes(response.tracking_events[0].status_code),
        isError: (response.tracking_events[0].length == 0 ? false : true),
        code: response.tracking_events[0].statusCode,
        description: response.tracking_events[0].description,
        address: {
          company: response.tracking_events[0].address.business_name,
          addressLines: response.tracking_events[0].address.lines,
          cityLocality: response.tracking_events[0].address.city,
          stateProvince: response.tracking_events[0].address.state,
          postalCode: response.tracking_events[0].address.zip,
          country: response.tracking_events[0].address.country,
          isResidential: (response.tracking_events[0].address.type == 'residential' ? true : false)
        },
        signer: {
          title: response.signed_by.salutation,
          given: response.signed_by.first_name,
          middle: response.signed_by.middle_name,
          family: response.signed_by.last_name,
          suffix: response.signed_by.suffix
        },
        notes: response.notes,
      }
    ]
  }
}

function mapStatusCodes(statusCodes) {
  switch(statusCodes) {
    case 'NY':
      return 'accepted';
    case 'C':
      return 'delivered';
    case 'IT':
      return 'in_transit';
  }
}

module.exports = trackShipment;
