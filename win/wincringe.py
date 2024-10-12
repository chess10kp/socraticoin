class Transaction:
    def __init__(self, sender, reciever, amount, publickey, blockNumber):
     self.sender = sender
     self.reciever = reciever
     self.amount = amount
     self.publickey = publickey
     self.blockNumber = blockNumber
    def VerifyKey(publickey):
        if isVerifiable: return True
        else: return False

A = []
def createtrans(Transaction):
    p1 = Transaction("Ali", "Bob", 100, 12, 0)
    if p1.VerifyKey() == True: A.append(p1)
    else: print(-1)