
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Send, Phone, Check, AlertCircle } from "lucide-react";
import { useSwishPayment } from './use-swish-payment';

interface SwishPaymentProps {
  onComplete?: (success: boolean) => void;
}

const SwishPayment: React.FC<SwishPaymentProps> = ({ onComplete }) => {
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { status, error, initiatePayment, resetPayment } = useSwishPayment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    initiatePayment(amount, message || "Payment");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and one decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      return;
    }
    
    setAmount(value);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Phone className="mr-2 h-5 w-5 text-blue-500" />
          Swish Payment
        </CardTitle>
        <CardDescription>
          Send money via Swish to +46735765335
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'error' && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Something went wrong with your payment."}</AlertDescription>
          </Alert>
        )}
        
        {status === 'success' ? (
          <div className="text-center p-4 space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Payment Initiated</h3>
            <p className="text-gray-600">
              Check your Swish app to confirm the payment of {amount} SEK.
            </p>
            <Button 
              variant="outline" 
              onClick={resetPayment} 
              className="mt-4"
            >
              Make Another Payment
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (SEK)</Label>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="100.00"
                required
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Payment for services"
                maxLength={50}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={status === 'loading' || !amount}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Pay {amount ? `${amount} SEK` : "with Swish"}
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex justify-center">
        <p>
          Your payment will be sent to +46735765335
        </p>
      </CardFooter>
    </Card>
  );
};

export default SwishPayment;
