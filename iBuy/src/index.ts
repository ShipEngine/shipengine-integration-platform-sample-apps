import { OrderAppDefinition } from "@shipengine/integration-platform-sdk";

const orderSource: OrderAppDefinition = {
  id: "3b76c08d-4299-4333-90bb-cd952bc68525",
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
