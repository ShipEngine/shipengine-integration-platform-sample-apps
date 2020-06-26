"use strict";

module.exports = {
  id: "ec3dc540-b733-4816-83a8-1455ee2bdadc",
  name: "FreightCo",
  description: "FreightCo is a ground freight trucking company serving Central and North America.",
  websiteURL: "https://freightco.net",
  logo: "../logo.svg",

  connect: "connect.js",
  createShipment: "create-shipment.js",
  rateShipment: "rate-shipment.js",

  cancelPickups: "cancel-pickups.js",
  schedulePickup: "schedule-pickup.js",

  connectionForm: "forms/connect.js",
  settingsForm: "forms/settings.js",

  deliveryServices: [
    "delivery-services/international-ground.js",
    "delivery-services/standard-ground.js",
  ],

  pickupServices: [
    "pickup-services/drop-off.js",
    "pickup-services/flex-pickup.js",
    "pickup-services/next-day.js",
    "pickup-services/same-day.js"
  ],

  localization: {
    es: {
      description: "FreightCo es una compañía de transporte terrestre de carga que sirve a Centro y Norte América.",
      websiteURL: "https://freightco.ca",
    },
    fr: {
      description: "FreightCo est une entreprise de camionnage de fret terrestre desservant l'Amérique centrale et l'Amérique du Nord.",
      websiteURL: "https://freightco.com.mx",
    },
  },
};
