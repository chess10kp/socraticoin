import { Transaction, TransactionData } from "./transaction";
import { CryptoUtils } from "./crypto";

export interface BlockData {
  blockNumber: number;
  currHash: string;
  nonce: number;
  transactions: TransactionData[];
  blockReward: number;
  rewardAddress: string;
  prevHash: string;
  timestamp: number;
}

export class Block {
  blockNumber: number;
  currHash: string;
  nonce: number;
  transactions: Transaction[];
  blockReward: number;
  rewardAddress: string;
  prevHash: string;
  timestamp: number;

  constructor(
    blockNumber: number,
    currHash: string,
    nonce: number,
    transactions: Transaction[],
    blockReward: number,
    rewardAddress: string,
    prevHash: string
  ) {
    this.blockNumber = blockNumber;
    this.currHash = currHash;
    this.nonce = nonce;
    this.transactions = transactions;
    this.blockReward = blockReward;
    this.rewardAddress = rewardAddress;
    this.prevHash = prevHash;
    this.timestamp = Date.now();
  }

  toString(): string {
    let s = `${this.blockNumber} ${this.currHash.slice(0, 8)} ${this.nonce} ${this.blockReward} ${this.rewardAddress} ${this.prevHash.slice(0, 8)}\n`;
    for (const t of this.transactions) {
      s += `  ${t.toString()}\n`;
    }
    return s.slice(0, -1);
  }

  getUnhashedString(): string {
    const unhashedBlock = new Block(
      this.blockNumber,
      "",
      this.nonce,
      this.transactions,
      this.blockReward,
      this.rewardAddress,
      this.prevHash
    );
    return unhashedBlock.toString();
  }

  async calculateHash(): Promise<string> {
    return await CryptoUtils.sha256(this.getUnhashedString());
  }

  async isValid(difficulty: number): Promise<boolean> {
    const calculatedHash = await this.calculateHash();
    if (calculatedHash !== this.currHash) return false;
    
    const difficultyString = "0".repeat(difficulty);
    return this.currHash.slice(0, difficulty) === difficultyString;
  }

  toJSON(): BlockData {
    return {
      blockNumber: this.blockNumber,
      currHash: this.currHash,
      nonce: this.nonce,
      transactions: this.transactions.map(tx => tx.toJSON()),
      blockReward: this.blockReward,
      rewardAddress: this.rewardAddress,
      prevHash: this.prevHash,
      timestamp: this.timestamp,
    };
  }

  static fromJSON(data: BlockData): Block {
    const block = new Block(
      data.blockNumber,
      data.currHash,
      data.nonce,
      data.transactions.map(tx => Transaction.fromJSON(tx)),
      data.blockReward,
      data.rewardAddress,
      data.prevHash
    );
    block.timestamp = data.timestamp;
    return block;
  }
}