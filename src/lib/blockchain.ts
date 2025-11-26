import { Block, BlockData } from "./block";
import { Transaction } from "./transaction";
import { Wallet } from "./wallet";

export interface BlockchainData {
  transactionQueue: TransactionData[];
  genesisBlock: BlockData | null;
  currBlock: BlockData | null;
  difficulty: number;
  users: WalletData[];
  blockList: BlockData[];
}

export interface TransactionData {
  sender: string;
  receiver: string;
  amount: number;
  gasFee: number;
  signature: string;
  timestamp: number;
}

export interface WalletData {
  privateKey: string;
  publicKey: string;
  balance: number;
}

export class Blockchain {
  transactionQueue: Transaction[];
  genesisBlock: Block | null;
  currBlock: Block | null;
  difficulty: number;
  users: Wallet[];
  blockList: Block[];

  constructor() {
    this.transactionQueue = [];
    this.genesisBlock = null;
    this.currBlock = null;
    this.difficulty = 3;
    this.users = [];
    this.blockList = [];
  }

  async initialize(): Promise<void> {
    try {
      console.log("Creating users...");
      const userA = await Wallet.create();
      const userB = await Wallet.create();
      const userC = await Wallet.create();
      
      this.users = [userA, userB, userC];
      console.log("Users created successfully");

      console.log("Creating transactions...");
      const t1 = new Transaction(userA.getFullAddress(), userB.getFullAddress(), 100, 10);
      await t1.sign(userA.getPrivateKey());
      
      const t2 = new Transaction(userB.getFullAddress(), userC.getFullAddress(), 50, 5);
      await t2.sign(userB.getPrivateKey());
      
      const t3 = new Transaction(userC.getFullAddress(), userA.getFullAddress(), 25, 15);
      await t3.sign(userC.getPrivateKey());
      console.log("Transactions created and signed");

      console.log("Creating genesis block...");
      const genesisBlock = new Block(0, "", 0, [], 100, userA.getFullAddress(), "Genesis_Block");
      await this.mineBlock(genesisBlock);
      await this.submitBlock(genesisBlock);
      console.log("Genesis block created");

      console.log("Creating block 1...");
      const block1 = new Block(1, "", 0, [t1, t2, t3], 100, userA.getFullAddress(), this.currBlock!.currHash);
      await this.mineBlock(block1);
      await this.submitBlock(block1);
      console.log("Block 1 created");

      console.log("Creating more transactions...");
      const t4 = new Transaction(userB.getFullAddress(), userA.getFullAddress(), 50, 5);
      await t4.sign(userB.getPrivateKey());
      
      const t5 = new Transaction(userA.getFullAddress(), userC.getFullAddress(), 5, 1);
      await t5.sign(userA.getPrivateKey());
      console.log("More transactions created");

      console.log("Creating block 2...");
      const block2 = new Block(2, "", 0, [t4, t5], 100, userA.getFullAddress(), this.currBlock!.currHash);
      await this.mineBlock(block2);
      await this.submitBlock(block2);
      console.log("Block 2 created - initialization complete");
    } catch (error) {
      console.error("Error during blockchain initialization:", error);
      throw error;
    }
  }

  createNewUser(): Wallet {
    const user = new Wallet();
    this.users.push(user);
    return user;
  }

  async mineBlock(block: Block): Promise<void> {
    const difficultyString = "0".repeat(this.difficulty);
    block.nonce = 0;

    while (true) {
      block.currHash = await block.calculateHash();
      if (block.currHash.slice(0, this.difficulty) === difficultyString) {
        break;
      }
      block.nonce++;
    }
  }

  async submitBlock(block: Block): Promise<string> {
    const verification = await this.verifyBlock(block);
    if (verification !== "") {
      return verification;
    }

    this.blockList.push(block);
    this.currBlock = block;
    if (this.genesisBlock === null) {
      this.genesisBlock = block;
    }

    return `Block added to chain! Hash '${block.currHash.slice(0, 8)}'`;
  }

  async verifyBlockDifficulty(block: Block): Promise<boolean> {
    return await block.isValid(this.difficulty);
  }

  async verifyBlockHash(block: Block): Promise<boolean> {
    const calculatedHash = await block.calculateHash();
    return calculatedHash === block.currHash;
  }

  verifyBlockGenesis(block: Block): boolean {
    return this.genesisBlock === null && block.blockNumber === 0;
  }

  verifyBlockOrder(block: Block): boolean {
    if (block.blockNumber === 0) return true;
    return this.currBlock !== null && block.blockNumber === this.currBlock.blockNumber + 1;
  }

  verifyBlockHashOrder(block: Block): boolean {
    if (block.prevHash === "Genesis_Block") return true;
    return this.currBlock !== null && block.prevHash === this.currBlock.currHash;
  }

  async verifyBlockTransactions(block: Block): Promise<boolean> {
    for (const tx of block.transactions) {
      if (!tx.signature) return false;
    }
    return true;
  }

  async verifyBlock(block: Block): Promise<string> {
    if (!(await this.verifyBlockDifficulty(block))) {
      return `Block Refused: '${block.currHash.slice(0, 8)}' does not match difficulty: ${this.difficulty}`;
    }
    if (!(await this.verifyBlockHash(block))) {
      return `Block Refused: '${block.currHash.slice(0, 8)}' does not match computed hash`;
    }
    if (block.blockNumber === 0 && !this.verifyBlockGenesis(block)) {
      return `Block Refused: B# '${block.blockNumber}' must be 0 for the Genesis Block`;
    }
    if (!this.verifyBlockOrder(block)) {
      return `Block Refused: B# '${block.blockNumber}' must follow previous in chain '${this.currBlock?.blockNumber}'`;
    }
    if (!this.verifyBlockHashOrder(block)) {
      return `Block Refused: prevHash '${block.prevHash.slice(0, 8)}' does not match currHash '${this.currBlock?.currHash.slice(0, 8)}'`;
    }
    if (!(await this.verifyBlockTransactions(block))) {
      return `Block Refused: Invalid Transaction detected`;
    }

    return "";
  }

  clear(): void {
    this.blockList = [];
    this.transactionQueue = [];
    this.currBlock = null;
    this.genesisBlock = null;
  }

  toJSON(): BlockchainData {
    return {
      transactionQueue: this.transactionQueue.map(tx => tx.toJSON()),
      genesisBlock: this.genesisBlock?.toJSON() || null,
      currBlock: this.currBlock?.toJSON() || null,
      difficulty: this.difficulty,
      users: this.users.map(user => user.toJSON()),
      blockList: this.blockList.map(block => block.toJSON()),
    };
  }

  static fromJSON(data: BlockchainData): Blockchain {
    const blockchain = new Blockchain();
    blockchain.transactionQueue = data.transactionQueue.map(tx => Transaction.fromJSON(tx));
    blockchain.genesisBlock = data.genesisBlock ? Block.fromJSON(data.genesisBlock) : null;
    blockchain.currBlock = data.currBlock ? Block.fromJSON(data.currBlock) : null;
    blockchain.difficulty = data.difficulty;
    blockchain.users = data.users.map(user => Wallet.fromJSON(user));
    blockchain.blockList = data.blockList.map(block => Block.fromJSON(block));
    return blockchain;
  }
}