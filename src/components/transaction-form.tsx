"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBlockchainStore } from "@/store/blockchain";
import { toast } from "sonner";

export function TransactionForm() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("100");
  const [gasFee, setGasFee] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createTransaction, getCurrentUser, getRandomUser } = useBlockchainStore();

  const currentUser = getCurrentUser();
  const randomUser = getRandomUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("No user wallet available");
      return;
    }

    if (!receiver || !amount || !gasFee) {
      toast.error("Please fill all fields");
      return;
    }

    const amountNum = parseInt(amount);
    const gasFeeNum = parseInt(gasFee);

    if (isNaN(amountNum) || isNaN(gasFeeNum)) {
      toast.error("Amount and gas fee must be numbers");
      return;
    }

    if (amountNum <= 0 || gasFeeNum <= 0) {
      toast.error("Amount and gas fee must be positive");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createTransaction(receiver, amountNum, gasFeeNum);
      toast.success("Transaction created successfully");
      setAmount("100");
      setGasFee("10");
    } catch (error) {
      toast.error("Failed to create transaction");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillRandomUser = () => {
    if (randomUser) {
      setReceiver(randomUser);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sender">From Address</Label>
             <Input
               id="sender"
               value={currentUser?.getShortAddress() || ""}
               disabled
               className="font-mono text-sm font-medium"
             />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="receiver">To Address</Label>
            <div className="flex gap-2">
               <Input
                 id="receiver"
                 value={receiver}
                 onChange={(e) => setReceiver(e.target.value)}
                 placeholder="Enter recipient address"
                 className="font-mono text-sm font-medium"
               />
              <Button
                type="button"
                variant="outline"
                onClick={fillRandomUser}
                disabled={!randomUser}
              >
                Random
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount to send"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gas">Gas Fee</Label>
            <Input
              id="gas"
              type="number"
              value={gasFee}
              onChange={(e) => setGasFee(e.target.value)}
              placeholder="Gas fee"
              min="1"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || !currentUser}
          >
            {isSubmitting ? "Creating..." : "Send Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}