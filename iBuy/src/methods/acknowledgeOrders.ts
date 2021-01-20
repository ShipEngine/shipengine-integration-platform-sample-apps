import {Transaction, SalesOrderNotification, AcknowledgedSalesOrder} from '@shipengine/connect'

import {Verification} from 'mock-server'

import {client} from '../api/client'
import {Session} from '../types/session'

/**
 * Logs in using the username and password entered on the login form
 */
export default async function acknowledgeOrders(
  transaction: Transaction<Session>,
  notifications: SalesOrderNotification[],
): Promise<AcknowledgedSalesOrder[]> {
  // STEP 1: Validation

  // STEP 2: Create the data that the order's API expects
  const data = {
    operation: "verify_orders",
    session_id: transaction.session.id,
    sales_order_ids: notifications.map(notification => notification.id)
  }

  // STEP 3: Call the order source's API
  const response = await client('order').post('/orders/verify', data)

  // Step 4: Create the output data that ShipEngine expects
  return formatAcknowledgedSalesOrders(response.data)
}

function formatAcknowledgedSalesOrders(verifiedSalesOrders: Verification[]): AcknowledgedSalesOrder[] {
  return verifiedSalesOrders.map((acknowledgedOrder) => {
    if (acknowledgedOrder.succeeded) {
      return {
        id: acknowledgedOrder.sales_order_id,
        succeeded: true
      }
    }

    return {
      id: acknowledgedOrder.sales_order_id,
      succeeded: false,
      failureReason: acknowledgedOrder.reason_for_failure
    }
  })
}
