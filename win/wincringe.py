class Transaction:
    def __init__(self, sender, reciever, amount, isSigned, isVerifiable):
     self.sender = sender
     self.reciever = reciever
     self.amount = amount
     self.isSigned = isSigned
     self.isVerifiable = isVerifiable #if signed by the private, can check w/ public
    
p1 = Transaction("Ali", "Bob", 100, True, True)
    

