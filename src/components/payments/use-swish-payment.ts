
import { useState } from 'react';
import { toast } from "sonner";
import { SwishPaymentRequest, SwishPaymentResponse, SwishPaymentStatus } from './swish-types';

export function useSwishPayment() {
  const [status, setStatus] = useState<SwishPaymentStatus>('idle');
  const [paymentResponse, setPaymentResponse] = useState<SwishPaymentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (amount: string, message: string = "Payment") => {
    try {
      setStatus('loading');
      setError(null);
      
      // In a real implementation, this would call a backend endpoint
      // that securely communicates with the Swish API
      const paymentRequest: SwishPaymentRequest = {
        payeePaymentReference: `REF-${Date.now()}`,
        callbackUrl: `${window.location.origin}/payment-callback`,
        payeeAlias: "+46735765335", // The phone number provided by the user
        amount,
        currency: "SEK",
        message
      };
      
      // Simulate calling a backend API
      // In production, this would be an actual fetch to your backend
      console.log("Initiating Swish payment:", paymentRequest);
      
      // Simulated response for demonstration
      // In a real implementation, this would come from your backend API
      setTimeout(() => {
        const mockResponse: SwishPaymentResponse = {
          id: `PAYMENT-${Date.now()}`,
          paymentRequestToken: `TOKEN-${Math.random().toString(36).substring(2, 15)}`,
          status: 'CREATED'
        };
        
        setPaymentResponse(mockResponse);
        setStatus('success');
        toast.success("Payment initiated successfully! Check your Swish app to confirm.");
      }, 1500);
      
    } catch (err) {
      console.error("Error initiating Swish payment:", err);
      setError(err instanceof Error ? err.message : "Failed to initiate payment");
      setStatus('error');
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const resetPayment = () => {
    setStatus('idle');
    setPaymentResponse(null);
    setError(null);
  };

  return {
    status,
    paymentResponse,
    error,
    initiatePayment,
    resetPayment
  };
}
