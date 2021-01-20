import {Transaction, SalesOrderTimeRange, SalesOrders, SalesOrder} from '@shipengine/connect'

import {Order} from 'mock-server'

import {client} from '../api/client'
import {Session} from '../types/session'

import {mapSalesOrderStatus, mapPaymentMethod} from '../status-and-mappings'

/**
 * Logs in using the username and password entered on the login form
 */
export default async function getSalesOrdersByDate(
  transaction: Transaction<Session>,
  range: SalesOrderTimeRange,
): Promise<SalesOrders> {
  // STEP 1: Validation

  // STEP 2: Create the data that the order's API expects
  const data = {
    operation: "retrieve_sales_orders_by_date",
    session_id: transaction.session.id,
    start_date: range.startDateTime,
    end_date: range.endDateTime
  }

  // STEP 3: Call the order source's API
  const response = await client('order').post('/orders/get', data)

  // Step 4: Create the output data that ShipEngine expects
  return { salesOrders: formatSalesOrders(response.data) }
}

function formatSalesOrders(salesOrders: Order[]): SalesOrder[] {
  return salesOrders.map(salesOrder => {
    return {
      id: salesOrder.id,
      createdDateTime: salesOrder.created_at,
      status: mapSalesOrderStatus(salesOrder.status),
      paymentMethod: mapPaymentMethod(salesOrder.payment.method),
      requestedFulfillments: [
        {
          items: salesOrder.shipping_items.map((item) => {
            return {
              id: item.id,
              name: item.name,
              product: { id: item.product_id },
              quantity: {
                value: item.quantity
              },
              unitPrice: {
                value: item.price_per_unit,
                currency: "usd"
              },
            }
          }),
          shipTo: {
            name: salesOrder.address.business_name,
            addressLines: salesOrder.address.lines,
            cityLocality: salesOrder.address.city,
            stateProvince: salesOrder.address.state,
            postalCode: salesOrder.address.postalCode,
            country: salesOrder.address.country
          }
        }
      ],
      buyer: {
        id: salesOrder.buyer.id,
        name: salesOrder.buyer.name
      },
    }
  }) as SalesOrder[]
}
