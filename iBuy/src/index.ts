import { OrderAppDefinition } from "@shipengine/integration-platform-sdk";

const orderSource: OrderAppDefinition = {
  id: "5e386891-f693-4cdf-8b0c-82d7eb7542d0",
  name: "IBuy MarketPlace",
  description: "Welcome to iBuy, the international marketplace for all of your needs.",
  websiteURL: "https://www.iBuy.net",
  logo: "./../logo.svg",
  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),

  connect: import("./methods/connect"),
  getSeller: import("./methods/get-seller"),
  getSalesOrder: import("./methods/get-sales-order"),
  getSalesOrdersByDate: import("./methods/get-sales-orders-by-date"),
  shipmentCreated: import("./methods/shipment-created"),
  shipmentCancelled: import("./methods/shipment-cancelled")
}

export default orderSource;