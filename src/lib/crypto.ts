export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

export interface CryptoSignature {
  r: string;
  s: string;
  recoveryParam?: number;
}

export class CryptoUtils {
  static async generateKeyPair(): Promise<KeyPair> {
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "ECDSA",
          namedCurve: "P-384",
        },
        true,
        ["sign", "verify"]
      );

      const privateKey = await window.crypto.subtle.exportKey(
        "jwk",
        keyPair.privateKey
      );
      const publicKey = await window.crypto.subtle.exportKey(
        "jwk",
        keyPair.publicKey
      );

      return {
        privateKey: JSON.stringify(privateKey),
        publicKey: JSON.stringify(publicKey),
      };
    } catch (error) {
      console.error("Key generation failed:", error);
      throw error;
    }
  }

  static async importPrivateKey(privateKeyJwk: string): Promise<CryptoKey> {
    const privateKey = JSON.parse(privateKeyJwk);
    return await window.crypto.subtle.importKey(
      "jwk",
      privateKey,
      {
        name: "ECDSA",
        namedCurve: "P-384",
      },
      false,
      ["sign"]
    );
  }

  static async importPublicKey(publicKeyJwk: string): Promise<CryptoKey> {
    const publicKey = JSON.parse(publicKeyJwk);
    return await window.crypto.subtle.importKey(
      "jwk",
      publicKey,
      {
        name: "ECDSA",
        namedCurve: "P-384",
      },
      false,
      ["verify"]
    );
  }

  static async sign(privateKey: CryptoKey, data: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    return await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: { name: "SHA-256" },
      },
      privateKey,
      encodedData
    );
  }

  static async verify(
    publicKey: CryptoKey,
    signature: ArrayBuffer,
    data: string
  ): Promise<boolean> {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    return await window.crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: { name: "SHA-256" },
      },
      publicKey,
      signature,
      encodedData
    );
  }

  static async sha256(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  static arrayBufferToHex(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer);
    return Array.from(byteArray)
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  static hexToArrayBuffer(hex: string): ArrayBuffer {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes.buffer;
  }

  static getShortAddress(publicKeyJwk: string): string {
    const publicKey = JSON.parse(publicKeyJwk);
    const x = publicKey.x || "";
    return x.slice(-8);
  }

  static getFullAddress(publicKeyJwk: string): string {
    const publicKey = JSON.parse(publicKeyJwk);
    return `${publicKey.crv}|${publicKey.x}|${publicKey.y}`;
  }
}