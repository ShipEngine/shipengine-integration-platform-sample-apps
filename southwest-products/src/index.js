const orderSource = {
  id: "5e386891-f693-4cdf-8b0c-82d7eb7542d0",
  name: "SouthWest Products",
  description: "Welcome to the SouthWest Products Marketplace, a place for local producers to list and sell their goods",
  websiteURL: "https://www.southwest-products.com",
  logo: "./../logo.svg",
  connectionForm: "./forms/connect.js",
  settingsForm: "./forms/settings.js",

  connect: "./methods/connect.js",
  getSeller: "./methods/get-seller.js",
  getSalesOrder: "./methods/get-sales-order.js",
  getSalesOrdersByDate: "./methods/get-sales-orders-by-date.js",
  shipmentCreated: "./methods/shipment-created.js",
  shipmentCancelled: "./methods/shipment-cancelled.js"
}

module.exports = orderSource;