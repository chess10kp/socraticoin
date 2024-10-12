class Transaction:
    def __init__(self, sender, reciever, amount, signed,  gasFee):
     self.sender = sender
     self.reciever = reciever
     self.amount = amount
     self.signed = signed
     self.gasFee = gasFee
    def __str__(self):
        return str(self.sender + " " + 
                   self.reciever + " " + 
                   str(self.amount) + " " + 
                   self.signed + " " + 
                   str(self.gasFee))
A = []
def createtrans(Transaction):
    p1 = Transaction("Ali", "Bob", 100, 12, 0)
    print(p1)
x = Transaction("Ali", "Bob", 100, 12, 0)
print(x.sender)