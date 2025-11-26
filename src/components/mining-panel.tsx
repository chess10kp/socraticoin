"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBlockchainStore } from "@/store/blockchain";
import { toast } from "sonner";

export function MiningPanel() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [rewardAddress, setRewardAddress] = useState("");
  const [blockReward, setBlockReward] = useState("100");
  const [isMining, setIsMining] = useState(false);

  const { getTransactions, mineBlock, getCurrentUser } = useBlockchainStore();
  
  const transactions = getTransactions();
  const currentUser = getCurrentUser();

  const toggleTransactionSelection = (signature: string) => {
    setSelectedTransactions(prev => 
      prev.includes(signature)
        ? prev.filter(sig => sig !== signature)
        : [...prev, signature]
    );
  };

  const handleMine = async () => {
    if (selectedTransactions.length === 0) {
      toast.error("No transactions selected for mining");
      return;
    }

    if (!rewardAddress) {
      toast.error("Please enter a reward address");
      return;
    }

    const rewardAmount = parseInt(blockReward);
    if (isNaN(rewardAmount) || rewardAmount <= 0) {
      toast.error("Invalid block reward amount");
      return;
    }

    setIsMining(true);
    
    try {
      await mineBlock(selectedTransactions, rewardAddress, rewardAmount);
      toast.success(`Block mined successfully with ${selectedTransactions.length} transactions`);
      setSelectedTransactions([]);
      setBlockReward("100");
    } catch (error) {
      toast.error("Failed to mine block");
      console.error(error);
    } finally {
      setIsMining(false);
    }
  };

  const selectAllTransactions = () => {
    setSelectedTransactions(transactions.map(tx => tx.signature));
  };

  const clearSelection = () => {
    setSelectedTransactions([]);
  };

  const fillCurrentUserAddress = () => {
    if (currentUser) {
      setRewardAddress(currentUser.getFullAddress());
    }
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
        <CardTitle>Mining Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rewardAddress">Reward Address</Label>
              <div className="flex gap-2">
                 <Input
                   id="rewardAddress"
                   value={rewardAddress}
                   onChange={(e) => setRewardAddress(e.target.value)}
                   placeholder="Enter reward address"
                   className="font-mono text-sm font-medium"
                 />
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillCurrentUserAddress}
                  disabled={!currentUser}
                >
                  Use Mine
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="blockReward">Block Reward</Label>
              <Input
                id="blockReward"
                type="number"
                value={blockReward}
                onChange={(e) => setBlockReward(e.target.value)}
                placeholder="Block reward"
                min="1"
              />
            </div>
          </div>

          {transactions.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Select Transactions to Mine</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllTransactions}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSelection}
                  >
                    Clear
                  </Button>
                </div>
              </div>

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

              <div className="flex justify-between items-center">
                 <p className="text-sm text-foreground font-medium">
                   {selectedTransactions.length} of {transactions.length} transactions selected
                 </p>
                <Button 
                  onClick={handleMine}
                  disabled={selectedTransactions.length === 0 || isMining || !rewardAddress}
                >
                  {isMining ? "Mining..." : `Mine Block (${selectedTransactions.length} tx)`}
                </Button>
              </div>
            </div>
          )}

          {transactions.length === 0 && (
             <p className="text-foreground text-center py-8 font-medium">
               No transactions available to mine
             </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}