import {Request, Response} from 'express'
import {address, commerce, company, date, name, random} from 'faker'

import {range} from '../../utils/fp'
import {enumValue} from '../../utils/random'
import {Address} from '../../utils/types'

// ENUMS
enum PaymentStatus {
  PaymentNeeded = 'payment_needed',
  Processing = 'processing',
  Paid = 'paid',
  FailedPayment = 'failed_payment',
  Cancelled = 'cancelled'
}

enum PaymentMethod {
  Cash = 'cash',
  CC = 'cc',
  TransferFromBank = 'transfer_from_bank'
}

enum OrderStatus {
  PaymentNeeded = 'payment_needed',
  InTransit = 'in_transit',
  OnHold = 'on_hold',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

// TYPES
type Payment = {
  status: string
  method: string
}

type Buyer = {
  id: string
  name: string
}

type ShippingInfo = {
  confirmation_type: string
  delivery_date: string
}

type ShippingItem = {
  id: string
  name: string
  quantity: number
  price_per_unit: number
  product_id: string
}

export type Order = {
  id: string
  created_at: string
  status: string
  seller_id: string
  shipping_notes: string
  buyer: Buyer
  payment: Payment
  address: Address
  shipping_info: ShippingInfo
  shipping_items: ShippingItem[]
}

// HELPER FUNCTIONS
const item = (): ShippingItem => {
  return {
    id: random.uuid(),
    name: commerce.productName(),
    quantity: random.number(9) + 1,
    price_per_unit: random.number(9) + 1,
    product_id: random.uuid()
  }
}

const order = (): Order => {
  return {
    id: random.uuid(),
    created_at: date.recent().toISOString(),
    status: enumValue(OrderStatus),
    seller_id: random.uuid(),
    shipping_notes: random.words(4),
    buyer: {
      id: random.uuid(),
      name: `${name.firstName()} ${name.lastName()}`
    },
    payment: {
      status: enumValue(PaymentStatus),
      method: enumValue(PaymentMethod)
    },
    address: {
      business_name: company.companyName(),
      lines: [`${address.streetAddress()} ${address.streetName()} ${address.streetSuffix()}`],
      city: address.city(),
      state: address.stateAbbr(),
      postal_code: address.zipCode(),
      country: 'US',
      time_zone: address.timeZone()
    },
    shipping_info: {
      confirmation_type: 'signature',
      delivery_date: date.soon(1).toISOString()
    },
    shipping_items: range(random.number(3) + 1).map(item)
  }
}

/**
 * Retrieve sales orders, ordered by date.
 */
export const ordersGet = (_: Request, res: Response): void => {
  const data = range(random.number(3) + 1).map(order)

  res.json(data)
}