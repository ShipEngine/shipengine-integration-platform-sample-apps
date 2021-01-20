import {Request, Response} from 'express'
import {random} from 'faker'

// TYPES
type PickUp = {
  pick_up_id: string
  service_code: string
}

type Success = {
  id: string
}

type Failure = {
  id: string
  error: boolean
  reason: string
}

type RequestBody = {
  scheduled_pick_ups: PickUp[]
}

// HELPER FUNCTIONS
const check = (pickup: PickUp): Success | Failure => {    
  if (random.boolean()) {
    return {
      id: pickup.pick_up_id
    }
  }

  return {
    id: pickup.pick_up_id,
    error: true,
    reason: `${pickup.service_code} must be cancelled by phone. Please call 1-800-555-5555`
  }
}

/**
 * Cancel a pick-up.
 */
export const pickupCancel = (req: Request, res: Response): void => {
  const body: RequestBody = req.body

  const data = {
    canceled_pick_ups: body.scheduled_pick_ups.map(check)
  }
  
  res.json(data)
}