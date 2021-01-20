import {readFileSync} from 'fs'
import {join} from 'path'
import {cwd} from 'process'

import {Request, Response} from 'express'

// TYPES
type RequestBody = {
  tracking_number: string
  shipment_tracking_numbers: string[]
}

/**
 * Create a manifest.
 */
export const manifestCreate = (req: Request, res: Response): void => {
  const body: RequestBody = req.body

  const data = {
    manifest_label_image: readFileSync(join(cwd(), 'files', 'sample-label.pdf')).toString('base64'),
    manifested_shipments: body.shipment_tracking_numbers.map(tracking_number => {tracking_number}),
    failed_manifest_shipments: <string[]>[]
  }

  res.json(data)
}