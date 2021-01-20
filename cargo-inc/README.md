# ![Cargo Incorporated](logo.svg)

This folder contains a sample [**ShipEngine Connect app**](https://connect.shipengine.com/docs/) that demonstrates how to integrate a carrier into ShipEngine.
In this case the carrier is a fictional company called "Cargo Incorporated".

This app defines the [delivery services](./delivery-services), [delivery confirmations](./delivery-confirmations), and [packaging](./packaging) that Cargo Incorporated supports.
It also defines the [account connection form](./forms/connect.json) and [account settings form](./forms/settings.json) that enable a user to connect and manage their Cargo Incorporated account in ShipEngine.
Because Cargo Incorporated ships worldwide, the app includes [**localization**](./cargo-inc.yaml) support, including [form localization](./forms/connect.json).

This app implements functionality, such as [creating shipments](./src/create-shipment.js), [calculating shipping costs](./src/rate-shipment.js), and the [connection logic](./src/connect.js) that validates a user's credentials and establishes a session.

## About ShipEngine Connect Apps

Apps are just [NPM packages](https://docs.npmjs.com/about-packages-and-modules) that export an object with properties and methods that define the application's functionality.

An app must have a [`package.json` file](https://docs.npmjs.com/files/package.json) in its root directory, which specifies its name, version number, and dependencies.
The [ShipEngine Connect SDK](https://www.npmjs.com/package/@shipengine/connect-sdk) (`@shipengine/connect-sdk`) must be listed as a dependency or devDependency.

Other than that, the folder structure and file names are entirely up to you.
As long as your app exports an object with the right structure, it doesn't matter whether that object is defined in a single file or spread across many files.

## Supported File Types

To make things even easier for you, ShipEngine Connect supports JSON, JSON5, YAML, and even TypeScript files in addition to plain JavaScript.
You can use any combination of these file types for different parts of your app.

The Cargo Incorporated app uses **YAML** for all of its metadata and **JavaScript** for its functionality. See [other sample apps](../README.md) for examples in other formats.
