const { orderStatus, paymentStatus, paymentMethod } = require("../status-and-mappings");

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
function retrieveSalesOrdersByDate(request) {

  return [
    {
      id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      created_at: new Date().toISOString(),
      status: orderStatus[Math.floor(Math.random() * orderStatus.length)],
      payment: {
        status: paymentStatus[Math.floor(Math.random() * paymentStatus.length)],
        method: paymentMethod[Math.floor(Math.random() * paymentMethod.length)]
      },
      address: {
        business_name: "John Doe Business Name",
        lines: ["4450 E Palm Valley Blvd", "Bldg B", "Ste100"],
        city: "Round Rock",
        state: "Texas",
        postalCode: "78665",
        country: "US",
        time_zone: "America/Chicago"
      },
      seller_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      buyer: {
        id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
        name: "John Doe"
      },
      shipping_info: {
        confirmation_type: "signature",
        delivery_date: new Date().toISOString(),
      },
      shipping_items: [
        {
          id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
          name: "Item 1",
          quantity: 2,
          price_per_unit: 10
        },
        {
          id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
          name: "Item 2",
          quantity: 4,
          price_per_unit: 2
        }
      ],
      shipping_notes: "Please ring doorbell during dropoff"
    },
    {
      id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      created_at: new Date().toISOString(),
      status: orderStatus[Math.floor(Math.random() * orderStatus.length)],
      payment: {
        status: paymentStatus[Math.floor(Math.random() * paymentStatus.length)],
        method: paymentMethod[Math.floor(Math.random() * paymentMethod.length)]
      },
      address: {
        business_name: "Jane Doe Business Name",
        lines: ["1 Letterman Dr", "Building C",],
        city: "San Francisco",
        state: "CA",
        postalCode: "94129",
        country: "US",
        time_zone: "America/Los_Angeles"
      },
      seller_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      buyer: {
        id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
        name: "Jane Doe"
      },
      shipping_info: {
        confirmation_type: "signature",
        delivery_date: new Date().toISOString(),
      },
      shipping_items: [
        {
          id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
          name: "Item 1",
          quantity: 2,
          price_per_unit: 10
        },
        {
          id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
          name: "Item 2",
          quantity: 4,
          price_per_unit: 2
        }
      ],
      shipping_notes: "Please ring doorbell during dropoff"
    }
  ]
}

module.exports = retrieveSalesOrdersByDate;