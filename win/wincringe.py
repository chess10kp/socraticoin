from maria_compute.RSA_new import *
class Transaction:
    def __init__(self, sender, reciever, amount, signature, gasFee):
     self.sender = sender
     self.reciever = reciever
     self.amount = amount
     self.signature = signature
     self.gasFee = gasFee
    def __str__(self):
        # print(type(self.sender))
        return str(str(self.sender)[-6:-2] + " -> " + 
                   str(self.reciever)[-6:-2] + " Amt: " + 
                   str(self.amount) + " Fee: " + 
                   str(self.gasFee) +  " Sig: " +
                   str(self.signature.hex())[-4:])
A = []
def createtrans(Transaction):   
    p1 = Transaction("Ali", "Bob", 100, 12, 0)
    print(p1)
x = Transaction("Ali", "Bob", 100, 12, 0)

def unsigned(t):
    return Transaction(t.sender, t.reciever, t.amount, b"", t.gasFee)