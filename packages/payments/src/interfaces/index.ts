export interface IPaymentGateway {
  processPayment(amount: number, currency: string): Promise<boolean>;
}
