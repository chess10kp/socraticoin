import { CryptoUtils } from "./crypto";

export interface TransactionData {
  sender: string;
  receiver: string;
  amount: number;
  gasFee: number;
  signature: string;
  timestamp: number;
}

export class Transaction {
  sender: string;
  receiver: string;
  amount: number;
  gasFee: number;
  signature: string;
  timestamp: number;

  constructor(sender: string, receiver: string, amount: number, gasFee: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.gasFee = gasFee;
    this.signature = "";
    this.timestamp = Date.now();
  }

  toString(): string {
    return `${this.sender.slice(-4)} -> ${this.receiver.slice(-4)} Amt: ${this.amount} Fee: ${this.gasFee} Sig: ${this.signature.slice(-4)}`;
  }

  toFullString(): string {
    return `${this.sender} -> ${this.receiver} Amt: ${this.amount} Fee: ${this.gasFee} Sig: ${this.signature}`;
  }

  getUnsignedString(): string {
    return `${this.sender} -> ${this.receiver} Amt: ${this.amount} Fee: ${this.gasFee}`;
  }

  async sign(privateKeyJwk: string): Promise<void> {
    const privateKey = await CryptoUtils.importPrivateKey(privateKeyJwk);
    const signatureBuffer = await CryptoUtils.sign(privateKey, this.getUnsignedString());
    this.signature = CryptoUtils.arrayBufferToHex(signatureBuffer);
  }

  async verify(publicKeyJwk: string): Promise<boolean> {
    if (!this.signature) return false;
    
    const publicKey = await CryptoUtils.importPublicKey(publicKeyJwk);
    const signatureBuffer = CryptoUtils.hexToArrayBuffer(this.signature);
    return await CryptoUtils.verify(publicKey, signatureBuffer, this.getUnsignedString());
  }

  toJSON(): TransactionData {
    return {
      sender: this.sender,
      receiver: this.receiver,
      amount: this.amount,
      gasFee: this.gasFee,
      signature: this.signature,
      timestamp: this.timestamp,
    };
  }

  static fromJSON(data: TransactionData): Transaction {
    const tx = new Transaction(data.sender, data.receiver, data.amount, data.gasFee);
    tx.signature = data.signature;
    tx.timestamp = data.timestamp;
    return tx;
  }
}