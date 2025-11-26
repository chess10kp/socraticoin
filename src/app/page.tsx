"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { MiningPanel } from "@/components/mining-panel";
import { BlockchainVisualization } from "@/components/blockchain-visualization";
import { WalletInfo } from "@/components/wallet-info";
import { useBlockchainStore } from "@/store/blockchain";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

function BlockchainApp() {
  const { 
    blockchain, 
    isLoading, 
    initializeBlockchain, 
    getTransactions, 
    getBlocks 
  } = useBlockchainStore();

  useEffect(() => {
    if (!blockchain && !isLoading) {
      initializeBlockchain().catch(console.error);
    }
  }, [blockchain, isLoading, initializeBlockchain]);

  const transactions = getTransactions();
  const blocks = getBlocks();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Initializing Blockchain...</p>
        </div>
      </div>
    );
  }

  if (!blockchain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium mb-4">Failed to initialize blockchain</p>
          <Button onClick={initializeBlockchain}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            SocratiCoin
          </h1>
          <p className="text-muted-foreground">
            An Educational Cryptocurrency
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <TransactionForm />
          </div>
          <div className="lg:col-span-1">
            <TransactionList />
          </div>
          <div className="lg:col-span-1">
            <MiningPanel />
          </div>
          <div className="lg:col-span-1">
            <WalletInfo />
          </div>
        </div>

        <div className="mb-8">
          <BlockchainVisualization />
        </div>

        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>
            Blockchain Status: {blocks.length} blocks | {transactions.length} pending transactions
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlockchainApp />
      <Toaster />
    </QueryClientProvider>
  );
}
