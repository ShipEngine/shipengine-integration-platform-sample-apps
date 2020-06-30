![iBuy Marketplace](logo.svg)
=====================================================

This folder contains a sample [**ShipEngine Integration Platform app**](https://www.shipengine.com/docs/integration-platform/) that demonstrates how to integrate an order source into ShipEngine. In this case the order source is a fictional company called "iBuy Marketplace".

This app defines the [account connection form](./forms/connect.js) and [account settings form](./forms/settings.js) that enable a user to connect and manage their iBuy Marketplace account in ShipEngine.

The app implements the following functionality:
* [Connection logic](./connect.js), validates a user's credentials and establishes a session.
* [Getting sales orders](./get-sales-order.js), retrieves an individual sales order.
* [Getting sales orders by date](./get-sales-orders-by-date.js), retrieves sales orders based on a date range.
* [Getting a seller](./get-seller.js), retrieve an individual seller's information.
* [Create shipment](./shipment-created.js), get notified when a shipment is created.
* [Shipment cancelled](./shipment-cancelled.js), get notified when a shipment is cancelled.



About ShipEngine Integration Platform Apps
--------------------------------------------
Apps are just [NPM packages](https://docs.npmjs.com/about-packages-and-modules) that export an object with properties and methods that define the application's functionality.

An app must have a [`package.json` file](https://docs.npmjs.com/files/package.json) in its root directory, which specifies its name, version number, and dependencies. The [ShipEngine Integration Platform SDK](https://www.npmjs.com/package/@shipengine/integration-platform-sdk) (`@shipengine/integration-platform-sdk`) must be listed as a dependency or devDependency.

Other than that, the folder structure and file names are entirely up to you.  As long as your app exports an object with the right structure, it doesn't matter whether that object is defined in a single file or spread across many files.


Supported File Types
----------------------------
To make things even easier for you, the ShipEngine Integration Platform supports JSON, JSON5, YAML, and even TypeScript files in addition to plain JavaScript. You can use any combination of these file types for different parts of your app.

The iBuy Marketplace app is written entirely in **Typescript**. See [other sample apps](../README.md) for examples in other formats.
