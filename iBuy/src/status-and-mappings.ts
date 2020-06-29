import { SalesOrderStatus, PaymentStatus, PaymentMethod, Country } from "@shipengine/integration-platform-sdk";

export const orderStatus = ["payment_needed", "in_transit", "on_hold", "completed", "cancelled"];
export const paymentStatus = ["payment_needed", "processing", "paid", "failed_payment", "cancelled"];
export const paymentMethod = ["cash", "cc", "transfer_from_bank"];

export function mapSalesOrderStatus(status: string): SalesOrderStatus {
  const statusMapping = {
    "payment_needed": SalesOrderStatus.AwaitingPayment,
    "in_transit": SalesOrderStatus.AwaitingShipment,
    "on_hold": SalesOrderStatus.OnHold,
    "completed": SalesOrderStatus.Completed,
    "cancelled": SalesOrderStatus.Cancelled
  }

  return statusMapping[status];
}

export function mapPaymentStatus(status: string): PaymentStatus {
  const statusMapping = {
    "payment_needed": PaymentStatus.AwaitingPayment,
    "processing": PaymentStatus.InProcess,
    "paid": PaymentStatus.Paid,
    "failed_payment": PaymentStatus.Failed,
    "cancelled": PaymentStatus.Cancelled
  }

  return statusMapping[status];
}

export function mapPaymentMethod(status: string): PaymentMethod {
  const statusMapping = {
    "cash": PaymentMethod.Cash,
    "cc": PaymentMethod.CreditCard,
    "transfer_from_bank": PaymentMethod.BankTransfer
  }

  return statusMapping[status];
}

export function mapCountryCode(status: string): Country {
  const statusMapping = {
    "US": Country.UnitedStates,
    "MX": Country.Mexico,
    "CA": Country.Canada
  }

  return statusMapping[status];
}