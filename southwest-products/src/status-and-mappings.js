const orderStatus = ["payment_needed", "in_transit", "on_hold", "completed", "cancelled"];
const paymentStatus = ["payment_needed", "processing", "paid", "failed_payment", "cancelled"];
const paymentMethod = ["cash", "cc", "transfer_from_bank"];

function mapSalesOrderStatus(status) {
  const statusMapping = {
    "payment_needed": "awaiting_payment",
    "in_transit": "awaiting_payment",
    "on_hold": "on_hold",
    "completed": "completed",
    "cancelled": "cancelled"
  }

  return statusMapping[status];
}

function mapPaymentStatus(status) {
  const statusMapping = {
    "payment_needed": "awaiting_payment",
    "processing": "in_process",
    "paid": "paid",
    "failed_payment": "failed",
    "cancelled": "cancelled"
  }

  return statusMapping[status];
}

function mapPaymentMethod(status) {
  const statusMapping = {
    "cash": "cash",
    "cc": "credit_card",
    "transfer_from_bank": "bank_transfer"
  }

  return statusMapping[status];
}

module.exports = {
  mapSalesOrderStatus,
  mapPaymentStatus,
  mapPaymentMethod,
  orderStatus,
  paymentStatus,
  paymentMethod
}