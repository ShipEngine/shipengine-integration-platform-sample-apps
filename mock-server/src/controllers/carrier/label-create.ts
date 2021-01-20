import {readFileSync} from 'fs'
import {join} from 'path'
import {cwd} from 'process'

import {Request, Response} from 'express'
import {date, random} from 'faker'

// TYPES
type RequestBody = {
  ship_date: string
  total_weight: number
  package_number: number
}

/**
 * Create a label.
 */
export const labelCreate = (req: Request, res: Response): void => {
  const body: RequestBody = req.body

  const data = {
    tracking_number: random.uuid(),
    delivery_date: date.soon(4, body.ship_date).toISOString(),
    shipment_cost: .97 * body.total_weight,
    confirmation_cost: 1.26,
    location_cost: .000012 * (random.number(10) + 1),
    image: readFileSync(join(cwd(), 'files', 'sample-label.pdf')).toString('base64')
  }

  res.json(data)
}