import { Transaction, SalesOrderIdentifier, SalesOrderPOJO, SalesOrderStatus, QuantityUnit, Currency, Country } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";


/**
 * Logs in using the username and password entered on the login form
 */
export default async function getSalesOrder(
  transaction: Transaction<Session>,
  salesOrder: SalesOrderIdentifier,
): Promise<SalesOrderPOJO> {


  return {
    id: "12345",
    createdDateTime: new Date().toISOString(),
    status: SalesOrderStatus.Completed,
    shipTo: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      phoneNumber: "123-456-7890",
      company: "US International",
      addressLines: ["3800 N Lamar Blvd #220"],
      cityLocality: "Austin",
      stateProvince: "TX",
      postalCode: "78756",
      country: Country.UnitedStates,
      timeZone: "America/Chicago",
    },
    seller: { id: "12234" },
    buyer: {
      id: "1234",
      name: "A Buyer"
    },
    items: [
      { 
        id: "1234", 
        name: "My Item",
        unitPrice: {
          value: 123,
          currency: Currency.UnitedStatesDollar
        },
        quantity: {
          value: 4,
          unit: QuantityUnit.Each
        }
      }
    ]
  }

  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // Step 4: Create the output data that ShipEngine expects
  // which is persisted across all method calls
  // transaction.session = {};
}
