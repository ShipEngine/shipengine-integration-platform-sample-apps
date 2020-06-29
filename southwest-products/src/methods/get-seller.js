const apiClient = require("../mock-api/client");

/**
 * Logs in using the username and password entered on the login form
 */
async function getSeller(transaction, seller) {

  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "retrieve_seller",
    session_id: transaction.session.id,
    seller_id: seller.id
  }

  // STEP 3: Call the order source's API
  const response = await apiClient.request({ data });
  
  // Step 4: Create the output data that ShipEngine expects
  return formatSeller(response.data);

}

function formatSeller(data) {
  
  return {
    id: data.id,
    store: {
      id: data.store_id,
      name: data.name,
      warehouses: data.seller_warehouses.map((warehouse) => {
        return {
          id: warehouse.id,
          name: warehouse.name,
          shipFrom: {
            company: warehouse.address.business_name,
            addressLines: warehouse.address.lines,
            cityLocality: warehouse.address.city,
            stateProvince: warehouse.address.state,
            postalCode: warehouse.address.postalCode,
            country: "US",
            timeZone: warehouse.address.time_zone
          }
        }
      })
    }
  }
}

module.exports = getSeller;