import {Request, Response} from 'express';
import {date, random} from 'faker'

// CONSTANTS
const DEFAULT_PICKUP_COST = 2;
const DEFAULT_TAX_COST = 1;

// TYPES
type RequestBody = {
  date_time: string
  service_code: string
  total_weight: number
}

// HELPER FUNCTIONS
const flexpik = (): Date => {
  return date.soon(2)
}

const nextday = (): Date => {
  return date.soon(1)
}

const sameday = (): Date => {
  return date.soon()
}

const pickup: { [key: string]: () => Date } = {
  "FLEXPIK": flexpik,
  "NEXTDAY": nextday,
  "SAMEDAY": sameday
}

/**
 * Create a pick-up.
 */
export const pickupCreate = (req: Request, res: Response): void => {
  const body: RequestBody = req.body;

  const service = pickup[body.service_code] ? pickup[body.service_code] : sameday;

  const data = {
    id: random.uuid(),
    date_time: service().toISOString(),
    pickup_cost: .15 * body.total_weight || DEFAULT_PICKUP_COST,
    tax_cost: .03 * body.total_weight || DEFAULT_TAX_COST,
    location_cost: .000012 * (random.number(10) + 1)
  }

  res.json(data)
}