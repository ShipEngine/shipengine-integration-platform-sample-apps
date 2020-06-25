import { Transaction, SalesOrderPOJO, SalesOrderTimeRange, Currency, QuantityUnit } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";
import { RetrieveSalesOrderResponse } from "../mock-api/retrieve-sales-order";
import { apiClient } from "../mock-api/client";
import { mapSalesOrderStatus, mapPaymentStatus, mapPaymentMethod, mapCountryCode } from "../status-and-mappings";
import { RetrieveSalesOrdersByDateResponse } from "../mock-api/retrieve-sales-orders-by-date";


/**
 * Logs in using the username and password entered on the login form
 */
export default async function getSalesOrdersByDate(
  transaction: Transaction<Session>,
  range: SalesOrderTimeRange,
): Promise<Iterable<SalesOrderPOJO>> {


  // STEP 2: Create the data that the order's API expects
  const data = {
    operation: "retrieve_sales_orders_by_date",
    session_id: transaction.session.id,
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString()
  };

  // STEP 3: Call the order source's API
  const response = await apiClient.request<RetrieveSalesOrdersByDateResponse>({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSalesOrders(response.data);
}


function formatSalesOrders(salesOrders: RetrieveSalesOrdersByDateResponse): Iterable<SalesOrderPOJO> {

  return salesOrders.map(salesOrder => {
    return {
      id: salesOrder.id,
      createdDateTime: salesOrder.created_at,
      status: mapSalesOrderStatus(salesOrder.status),
      shipTo: {
        name: salesOrder.address.business_name,
        addressLines: salesOrder.address.lines,
        cityLocality: salesOrder.address.city,
        stateProvince: salesOrder.address.state,
        postalCode: salesOrder.address.postalCode,
        country: mapCountryCode(salesOrder.address.country),
        timeZone: salesOrder.address.time_zone
      },
      paymentStatus: mapPaymentStatus(salesOrder.payment.status),
      paymentMethod: mapPaymentMethod(salesOrder.payment.method),
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
  });
}