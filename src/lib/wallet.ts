import { CryptoUtils } from "./crypto";

export interface WalletData {
  privateKey: string;
  publicKey: string;
  balance: number;
}

export class Wallet {
  privateKey: string;
  publicKey: string;
  balance: number;

  constructor() {
    this.privateKey = "";
    this.publicKey = "";
    this.balance = 0;
  }

  async initialize(): Promise<void> {
    const keyPair = await CryptoUtils.generateKeyPair();
    this.privateKey = keyPair.privateKey;
    this.publicKey = keyPair.publicKey;
    this.balance = 0;
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  getPrivateKey(): string {
    return this.privateKey;
  }

  getShortAddress(): string {
    return CryptoUtils.getShortAddress(this.publicKey);
  }

  getFullAddress(): string {
    return CryptoUtils.getFullAddress(this.publicKey);
  }

  getBalance(): number {
    return this.balance;
  }

  setBalance(balance: number): void {
    this.balance = balance;
  }

  hasSufficientFunds(amount: number): boolean {
    return this.balance >= amount;
  }

  toJSON(): WalletData {
    return {
      privateKey: this.privateKey,
      publicKey: this.publicKey,
      balance: this.balance,
    };
  }

  static fromJSON(data: WalletData): Wallet {
    const wallet = new Wallet();
    wallet.privateKey = data.privateKey;
    wallet.publicKey = data.publicKey;
    wallet.balance = data.balance;
    return wallet;
  }

  static async create(): Promise<Wallet> {
    const wallet = new Wallet();
    await wallet.initialize();
    return wallet;
  }
}