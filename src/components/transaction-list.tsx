"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBlockchainStore } from "@/store/blockchain";
import { toast } from "sonner";

export function TransactionList() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const { getTransactions } = useBlockchainStore();
  
  const transactions = getTransactions();

  const toggleTransactionSelection = (signature: string) => {
    setSelectedTransactions(prev => 
      prev.includes(signature)
        ? prev.filter(sig => sig !== signature)
        : [...prev, signature]
    );
  };

  const moveToMining = () => {
    if (selectedTransactions.length === 0) {
      toast.error("No transactions selected");
      return;
    }
    toast.success(`${selectedTransactions.length} transactions ready for mining`);
  };

  const formatAddress = (address: string) => {
    return address.slice(-8);
  };

  const formatSignature = (signature: string) => {
    return signature.slice(-8);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Queue</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
           <p className="text-foreground text-center py-8 font-medium">
             No transactions in queue
           </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Gas</TableHead>
                  <TableHead>Signature</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(tx.signature)}
                        onChange={() => toggleTransactionSelection(tx.signature)}
                        className="rounded"
                      />
                    </TableCell>
                     <TableCell className="font-mono text-sm font-medium break-all">
                       {formatAddress(tx.sender)}
                     </TableCell>
                     <TableCell className="font-mono text-sm font-medium break-all">
                       {formatAddress(tx.receiver)}
                     </TableCell>
                     <TableCell className="font-medium">{tx.amount}</TableCell>
                     <TableCell className="font-medium">{tx.gasFee}</TableCell>
                     <TableCell className="font-mono text-sm font-medium">
                       {formatSignature(tx.signature)}
                     </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 flex justify-between items-center">
               <p className="text-sm text-foreground font-medium">
                 {selectedTransactions.length} of {transactions.length} selected
               </p>
              <Button 
                onClick={moveToMining}
                disabled={selectedTransactions.length === 0}
              >
                Mine Selected ({selectedTransactions.length})
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}