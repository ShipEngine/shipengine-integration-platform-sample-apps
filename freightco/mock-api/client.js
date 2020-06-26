"use strict";

const axios = require("axios");
const authenticate = require("./authenticate");
const generateLabel = require("./generate-label");
const quoteRates = require("./quote-rates");
const { pickUpCancellation } = require("./pickup-cancellation");
const pickUp = require("./pick-up");

// Read config values from environment variables
const API_URL = process.env.API_URL || "https://httpbin.org/anything";
const API_TIMEOUT = Number.parseInt(process.env.API_TIMEOUT || "5000");
const API_KEY = process.env.API_KEY || "";


// Create an API client, configured via environment variables
const apiClient = axios.create({
  method: "post",
  url: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "API-Key": API_KEY
  },
  transformResponse(data) {
    data = JSON.parse(data);

    // HttpBin echoes back the request data
    let request = {
      method: data.method,
      url: data.url,
      headers: data.headers,
      origin: data.origin,
      ...data.json
    };

    switch (request.operation) {
      case "authenticate":
        return authenticate(request);

      case "generate_label":
        return generateLabel(request);

      case "quote_rates":
        return quoteRates(request);

      case "pick_up":
        return pickUp(request);

      case "pick_up_cancellation":
        return pickUpCancellation(request);
    }
  }
});

module.exports = apiClient;
