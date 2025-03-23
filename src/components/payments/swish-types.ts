
export interface SwishPaymentRequest {
  payeePaymentReference: string;
  callbackUrl: string;
  payeeAlias: string;
  amount: string;
  currency: string;
  message?: string;
}

export interface SwishPaymentResponse {
  id: string;
  paymentRequestToken: string;
  status: 'CREATED' | 'PAID' | 'DECLINED' | 'ERROR';
}

export type SwishPaymentStatus = 'idle' | 'loading' | 'success' | 'error';
