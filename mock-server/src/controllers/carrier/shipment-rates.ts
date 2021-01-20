import {Request, Response} from 'express'
import {date, random} from 'faker'

import {cartesian, range} from '../../utils/fp'

// CONSTANTS
const SERVICES = ["ECO", "STD", "ON"]

const CONFIRMATIONS = ["SIG", "SIG-A", "SIG-R"]

// TYPES
type Rate = {
  service_code: string
  confirmation_code: string
  parcel_code: string
  ship_date: string
  delivery_date: string
  delivery_days: number
  shipment_cost: number
  confirmation_cost: number
  tax_cost: number
}

type RequestBody = {
  service_code?: string
  confirmation_code?: string
  parcel_codes?: string[]
  ship_date: string
  total_weight: number
}

// HELPER FUNCTIONS
const rate = (service_code: string, confirmation_code: string, parcel_code: string, ship_date: string, total_weight: number, ): Rate => {
  const delivery_days = random.number(7)

  return {
    service_code,
    confirmation_code,
    parcel_code,
    ship_date,
    delivery_date: date.soon(delivery_days, ship_date).toISOString(),
    delivery_days,
    shipment_cost: (random.number(3) * total_weight) + 1,
    confirmation_cost: random.number(2),
    tax_cost: (random.number(1) * total_weight) + 1
  }
}

/**
 * Get rates for a shipment.
 */
export const shipmentRates = (req: Request, res: Response): void => {
  const body: RequestBody = req.body

  const services = body.service_code ? [body.service_code] : SERVICES
  const confirmations = body.confirmation_code ? [body.confirmation_code] : CONFIRMATIONS
  const packaging = body.parcel_codes && body.parcel_codes.length > 0 ? body.parcel_codes : range(random.number(3) + 1).map(() => random.uuid())

  const matrix = cartesian(services, confirmations, packaging)

  const data = matrix.map(([service_code, confirmation_code, parcel_code]) => {
    return rate(service_code, confirmation_code, parcel_code, body.ship_date, body.total_weight)
  })

  res.json(data);
}