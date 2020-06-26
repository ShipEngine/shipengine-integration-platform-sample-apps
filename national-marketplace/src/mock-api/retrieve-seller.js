/**
 * This is a mock implementation of an order source's API that retrieves Seller information.
 */
function retrieveSeller(request) {

  return {
    id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    contact_information: {
      first_name: "John",
      last_name: "Doe",
      email: "john_doe@gmail.com",
      phone_number: "123-456-7890"
    },
    store_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    name: "Warehouse Inc. LLC",
    seller_warehouses: [
      {
        id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
        name: "Warehouse A",
        address: {
          business_name: "Warehouse Inc. LLC #1",
          lines: ["4450 E Palm Valley Blvd", "Bldg B", "Ste100"],
          city: "Round Rock",
          state: "Texas",
          postalCode: "78665",
          country: "US",
          time_zone: "America/Chicago"
        }
      }
    ]
  }
}

module.exports = retrieveSeller;