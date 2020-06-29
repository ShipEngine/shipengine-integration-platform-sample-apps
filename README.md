ShipEngine Integration Platform Sample Apps
===============================================

This repo contains sample ShipEngine Integration Platform apps to demonstrate and test various features of the ShipEngine Integration Platform platform.



About ShipEngine Integration Platform Apps
--------------------------------------------
Apps are just [NPM packages](https://docs.npmjs.com/about-packages-and-modules) that export an object with properties and methods that define the app's functionality.

An app must have a [`package.json` file](https://docs.npmjs.com/files/package.json) in its root directory, which specifies its name, version number, and dependencies. The [ShipEngine Integration Platform SDK](https://www.npmjs.com/package/@shipengine/integration-platform-sdk) (`@shipengine/integration-platform-sdk`) must be listed as a dependency or devDependency.

Other than that, the folder structure and file names are entirely up to you.  As long as your app exports an object with the right structure, it doesn't matter whether that object is defined in a single file or spread across many files.



Supported File Types
----------------------------
To make things even easier for you, the ShipEngine Integration Platform supports JSON, JSON5, YAML, and even TypeScript files in addition to plain JavaScript. You can use any combination of these file types for different parts of your app.



Sample Apps
-----------------------
This repo contains several sample ShipEngine Integration Platform apps that demonstrate various features of the platform.

| Sample Company | Description
|----------------|-----------------------------------------------------------------------------
| [![Cargo Incorporated](./cargo-inc/logo.svg)](./cargo-inc) | This is a carrier integration, written in **JavaScript**. It uses **YAML** to define service offerings and **JSON** for form definitions.
| [![FreightCo](./freightco/logo.svg)](./freightco) | This is a carrier integration written entirely in **JavaScript**, including its service offerings and form definitions.
| [![Parcel Post](./parcel-post/logo.svg)](./parcel-post) | This is a carrier integration written entirely in **TypeScript**, including its service offerings and form definitions.
| [![iBuy](./iBuy/logo.svg)](./iBuy) | A sample order app written entirely in **TypeScript** is coming soon
| [![SouthWest Products](./southwest-products/logo.svg)](./southwest-products) | A sample order app written entirely in **JavaScript** is coming soon
| [COMING SOON] | A sample order app written in **JavaScript**, **YAML**, and **JSON** is coming soon
