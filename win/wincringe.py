class Transaction:
    def __init__(self, sender, reciever, amount, signed, gasFee):
     self.sender = sender
     self.reciever = reciever
     self.amount = amount
     self.signature = signature
     self.gasFee = gasFee

A = []
def createtrans(Transaction):
    p1 = Transaction("Ali", "Bob", 100, 12, 0)
    