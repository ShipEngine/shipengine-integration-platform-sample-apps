import {Request, Response} from 'express'
import {date, internet, random} from 'faker'

export const connect = (_: Request, res: Response): void => {
  res.json({
    id: random.uuid(),
    ip: internet.ip(),
    created: date.recent(),
    language: 'en'
  })
}