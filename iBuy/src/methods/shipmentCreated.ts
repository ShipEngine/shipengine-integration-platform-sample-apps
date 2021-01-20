import {Transaction, SalesOrderShipment} from "@shipengine/connect"

import {client} from '../api/client'
import {Session} from '../types/session'

/**
 * Logs in using the username and password entered on the login form
 */
export default async function shipmentCreated(
  transaction: Transaction<Session>,
  shipment: SalesOrderShipment,
): Promise<void> {
  // STEP 1: Validation
  
  // STEP 2: Create the data that the order source's API expects
  const data = {
    session_id: transaction.session.id,
    shipment_id: shipment.trackingNumber
  }

  // STEP 3: Call the order source's API
  const response = await client('order').post('/shipment/create', data)
}