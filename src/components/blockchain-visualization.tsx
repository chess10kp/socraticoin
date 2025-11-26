"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlockchainStore } from "@/store/blockchain";

export function BlockchainVisualization() {
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  const { getBlocks } = useBlockchainStore();
  const blocks = getBlocks();

  const formatHash = (hash: string) => {
    return hash.slice(-8);
  };

  const formatAddress = (address: string) => {
    return address.slice(-8);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain</CardTitle>
      </CardHeader>
      <CardContent>
        {blocks.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No blocks in the blockchain
          </p>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {blocks.map((block, index) => (
              <div
                key={index}
                className="flex-shrink-0 border rounded-lg p-4 bg-gradient-to-r from-muted to-accent w-80 cursor-pointer"
                onClick={() => setExpandedBlock(expandedBlock === index ? null : index)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">Block #{block.blockNumber}</h3>
                     <p className="text-sm text-foreground font-medium">
                       Nonce: {block.nonce}
                     </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">
                      Hash: <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
                        {formatHash(block.currHash)}
                      </span>
                    </p>
                    <p className="text-sm font-mono mt-1">
                      Prev: <span className="bg-muted px-2 py-1 rounded">
                        {block.prevHash === "Genesis_Block" ? "Genesis" : formatHash(block.prevHash)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Block Reward</p>
                    <p className="text-lg font-bold text-foreground">{block.blockReward}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Reward Address</p>
                    <p className="font-mono text-sm">{formatAddress(block.rewardAddress)}</p>
                  </div>
                </div>

                {block.transactions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Transactions ({block.transactions.length})
                    </p>
                     <div className="space-y-1">
                       {block.transactions.map((tx, txIndex) => (
                         <div
                           key={txIndex}
                           className="bg-background border rounded p-2 text-sm font-medium"
                         >
                           <div className="flex justify-between items-center">
                             <span className="font-mono font-medium break-all">
                               {formatAddress(tx.sender)} → {formatAddress(tx.receiver)}
                             </span>
                             <span className="font-semibold">
                               {tx.amount} (+{tx.gasFee} gas)
                             </span>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                 {block.transactions.length === 0 && (
                   <p className="text-sm text-foreground italic">
                     No transactions in this block
                   </p>
                 )}

                 {expandedBlock === index && (
                   <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                     <p className="text-sm font-medium mb-2">Full Details</p>
                     <div className="space-y-1 text-xs font-mono break-all">
                       <p>Hash: {block.currHash}</p>
                       <p>Prev: {block.prevHash}</p>
                       <p>Nonce: {block.nonce}</p>
                       <p>Timestamp: {new Date(block.timestamp).toLocaleString()}</p>
                     </div>
                   </div>
                 )}
               </div>
            ))}

            <div className="flex-shrink-0 border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center w-80">
              <p className="text-foreground font-medium">
                Next Block #{blocks.length}
              </p>
              <p className="text-sm text-foreground mt-1">
                Waiting to be mined...
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}