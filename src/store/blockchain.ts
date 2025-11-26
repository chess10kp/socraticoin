import { create } from "zustand";
import { Blockchain } from "@/lib/blockchain";
import { Wallet } from "@/lib/wallet";
import { Transaction } from "@/lib/transaction";
import { Block } from "@/lib/block";

interface BlockchainStore {
  blockchain: Blockchain | null;
  currentUser: Wallet | null;
  isLoading: boolean;
  initializeBlockchain: () => Promise<void>;
  createTransaction: (receiver: string, amount: number, gasFee: number) => Promise<void>;
  mineBlock: (transactionSignatures: string[], rewardAddress: string, blockReward: number) => Promise<void>;
  addTransactionToQueue: (transaction: Transaction) => void;
  getTransactions: () => Transaction[];
  getBlocks: () => Block[];
  getCurrentUser: () => Wallet | null;
  getRandomUser: () => string;
  refreshBlockchain: () => void;
}

export const useBlockchainStore = create<BlockchainStore>((set, get) => ({
  blockchain: null,
  currentUser: null,
  isLoading: false,

  initializeBlockchain: async () => {
    console.log("Starting blockchain initialization...");
    set({ isLoading: true });
    try {
      const blockchain = new Blockchain();
      await blockchain.initialize();
      const currentUser = blockchain.users[0] || null;
      console.log("Blockchain initialized successfully");
      set({ blockchain, currentUser, isLoading: false });
    } catch (error) {
      console.error("Failed to initialize blockchain:", error);
      set({ isLoading: false });
    }
  },

  createTransaction: async (receiver: string, amount: number, gasFee: number) => {
    const { blockchain, currentUser } = get();
    if (!blockchain || !currentUser) return;

    const transaction = new Transaction(
      currentUser.getFullAddress(),
      receiver,
      amount,
      gasFee
    );
    
    await transaction.sign(currentUser.getPrivateKey());
    blockchain.transactionQueue.push(transaction);
    
    set({ blockchain });
  },

  mineBlock: async (transactionSignatures: string[], rewardAddress: string, blockReward: number) => {
    const { blockchain } = get();
    if (!blockchain) return;

    const transactionsToMine = blockchain.transactionQueue.filter(tx =>
      transactionSignatures.includes(tx.signature)
    );

    const blockNumber = blockchain.blockList.length;
    const prevHash = blockchain.currBlock?.currHash || "Genesis_Block";
    
    const newBlock = new Block(
      blockNumber,
      "",
      0,
      transactionsToMine,
      blockReward,
      rewardAddress,
      prevHash
    );

    await blockchain.mineBlock(newBlock);
    const result = await blockchain.submitBlock(newBlock);
    
    if (result.includes("Block added")) {
      blockchain.transactionQueue = blockchain.transactionQueue.filter(tx =>
        !transactionSignatures.includes(tx.signature)
      );
    }

    set({ blockchain });
  },

  addTransactionToQueue: (transaction: Transaction) => {
    const { blockchain } = get();
    if (!blockchain) return;
    
    blockchain.transactionQueue.push(transaction);
    set({ blockchain });
  },

  getTransactions: () => {
    const { blockchain } = get();
    return blockchain?.transactionQueue || [];
  },

  getBlocks: () => {
    const { blockchain } = get();
    return blockchain?.blockList || [];
  },

  getCurrentUser: () => {
    const { currentUser } = get();
    return currentUser;
  },

  getRandomUser: () => {
    const { blockchain, currentUser } = get();
    if (!blockchain || !currentUser) return "";
    
    const otherUsers = blockchain.users.filter(user => 
      user.getFullAddress() !== currentUser.getFullAddress()
    );
    
    if (otherUsers.length === 0) return "";
    return otherUsers[Math.floor(Math.random() * otherUsers.length)].getFullAddress();
  },

  refreshBlockchain: () => {
    const { blockchain } = get();
    if (blockchain) {
      set({ blockchain });
    }
  },
}));