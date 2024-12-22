### Transaction.py # Ali
# Transaction class

from Cryptography import RSA_sig, verify_sig

class Transaction:
    def __init__(self, sender: str, reciever: str, amount: str, gasFee: str):
        self.sender = sender
        self.reciever = reciever
        self.amount = amount
        self.signature: bytes = b""
        self.gasFee = gasFee

    def __str__(self):
        return (
            str(self.sender)[:4]
            + " -> "
            + str(self.reciever)[:4]
            + " Amt: "
            + str(self.amount)
            + " Fee: "
            + str(self.gasFee)
            + " Sig: "
            + str(self.signature.hex())[-4:]
        )

    def string_full(self):
        return (
            str(self.sender)[:]
            + " -> "
            + str(self.reciever)[:]
            + " Amt: "
            + str(self.amount)
            + " Fee: "
            + str(self.gasFee)
            + " Sig: "
            + str(self.signature.hex())[:]
        )

    def Sign(self, privKey: str) -> "Transaction": # Signs the transaction with the given private key
        self.signature = RSA_sig(privKey, str(self).encode("utf-8"))
        return self

    # Verifies a signed transaction with a public key
    def Verify(self, pubkey: str): verify_sig(pubkey, self.signature, str(self.unsigned(self)).encode("utf-8")) 

    # Return this transaction without the signature
    def unsigned(self, t: "Transaction") -> "Transaction": return Transaction(t.sender, t.reciever, t.amount, t.gasFee)
