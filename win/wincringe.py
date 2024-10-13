from maria_compute.RSA_new import *
class Transaction:
    def __init__(self, sender, reciever, amount, gasFee):
        self.sender = sender
        self.reciever = reciever
        self.amount = amount
        self.signature = b""
        self.gasFee = gasFee
    
    def __str__(self):
        return(str(self.sender)[:4] + " -> " + 
               str(self.reciever)[:4] + " Amt: " + 
               str(self.amount) + " Fee: " + 
               str(self.gasFee) +  " Sig: " +
               str(self.signature.hex())[-4:])

def unsigned(t):
    return Transaction(t.sender, t.reciever, t.amount, t.gasFee)

# A = []
# def createtrans(Transaction):   
#     p1 = Transaction("Ali", "Bob", 100, 12)
#     print(p1)
# x = Transaction("Ali", "Bob", 100, 12)
