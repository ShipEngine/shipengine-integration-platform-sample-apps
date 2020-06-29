const apiClient = require("../mock-api/client");
const { mapSalesOrderStatus, mapPaymentStatus, mapPaymentMethod } = require("../status-and-mappings");

/**
 * Logs in using the username and password entered on the login form
 */
async function getSalesOrder(transaction, salesOrder){

  // STEP 1: Validation
  // Add any desired validation here
  
  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "retrieve_sales_order",
    session_id: transaction.session.id,
    sales_order_id: salesOrder.id
  };

  // STEP 3: Call the order source's API
  const response = await apiClient.request({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSalesOrder(response.data);
}

function formatSalesOrder(salesOrder) {

  return {
    id: salesOrder.id,
    createdDateTime: salesOrder.created_at,
    status: mapSalesOrderStatus(salesOrder.status),
    shipTo: {
      name: salesOrder.address.business_name,
      addressLines: salesOrder.address.lines,
      cityLocality: salesOrder.address.city,
      stateProvince: salesOrder.address.state,
      postalCode: salesOrder.address.postalCode,
      country: salesOrder.address.country,
      timeZone: salesOrder.address.time_zone
    },
    paymentStatus: mapPaymentStatus(salesOrder.payment.status),
    paymentMethod: mapPaymentMethod(salesOrder.payment.method),
    seller: {
      id: salesOrder.seller_id,
    },
    buyer: {  
      id: salesOrder.buyer.id,
      name: salesOrder.buyer.name
    },
    items: salesOrder.shipping_items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        quantity: {
          value: item.quantity,
          unit: "ea"
        },
        unitPrice: {
          value: item.price_per_unit,
          currency: "USD"
        }
      }
    })
  }
}

module.exports = getSalesOrder;
