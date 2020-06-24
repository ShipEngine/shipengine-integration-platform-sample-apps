import { Transaction, SalesOrderIdentifier, SalesOrderPOJO, SalesOrderStatus, QuantityUnit, Currency, Country, PaymentStatus } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";
import { apiClient } from "../mock-api/client";
import { RetrieveSalesOrderResponse } from "../mock-api/retrieve-sales-order";
import { time } from "console";


/**
 * Logs in using the username and password entered on the login form
 */
export default async function getSalesOrder(
  transaction: Transaction<Session>,
  salesOrder: SalesOrderIdentifier,
): Promise<SalesOrderPOJO> {

  // STEP 1: Validation

  // STEP 2: Create the data that the order's API expects
  const data = {
    operation: "retrieve_sales_order",
    session_id: transaction.session.id,
    sales_order_id: salesOrder.id
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<RetrieveSalesOrderResponse>({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSalesOrder(response.data);
}

function formatSalesOrder(salesOrder: RetrieveSalesOrderResponse): SalesOrderPOJO {

  return {
    id: salesOrder.id,
    createdDateTime: salesOrder.created_at,
    status: SalesOrderStatus.AwaitingPayment,
    shipTo: {
      name: salesOrder.address.business_name,
      addressLines: salesOrder.address.lines,
      cityLocality: salesOrder.address.city,
      stateProvince: salesOrder.address.state,
      postalCode: salesOrder.address.postalCode,
      country: Country.UnitedStates,
      timeZone: salesOrder.address.time_zone
    },
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
          unit: QuantityUnit.Each
        },
        unitPrice: {
          value: item.price_per_unit,
          currency: Currency.UnitedStatesDollar
        }
      }
    })
  }
}
