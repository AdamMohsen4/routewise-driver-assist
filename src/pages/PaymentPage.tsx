
import React from 'react';
import SwishPayment from '@/components/payments/SwishPayment';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const PaymentPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Options</h1>
      
      <div className="grid gap-6 max-w-lg mx-auto">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>
          <p className="mb-4 text-gray-600">
            Choose one of our payment options to complete your transaction.
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Swish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Swish Payment</DialogTitle>
                <DialogDescription>
                  Send money directly to our account via Swish.
                </DialogDescription>
              </DialogHeader>
              <SwishPayment />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
