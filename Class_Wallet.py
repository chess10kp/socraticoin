### Class_Wallet.py # Maria
# create a create wallet that returns the funciton it'sef

from Cryptography import pub_to_str, priv_to_str, generateKeypair


class Wallet:
    def __init__(self):
        self.private_key, self.public_key = generateKeypair()
        self.balance = 0

    def get_public_key(self):  return self.public_key
    def get_private_key(self): return self.private_key

    def get_public_str(self):  return pub_to_str(self.public_key)[-40:-36] # last 4 chars
    def get_private_str(self): return priv_to_str(self.private_key)[-40:-36]

    def get_public_str_full(self):  return pub_to_str(self.public_key)
    def get_private_str_full(self): return priv_to_str(self.private_key)

    def get_crypto(self):         return int(self.balance)
    def check_balance(self, amt): return (self.get_crypto() - amt) < 0 # TRUE if have 'amt' or greater, else false

"""
A = Wallet(0)

addr = A.get_public_key()
sign = A.get_private_key()
amt = int(input("insert ammount you wanna spend "))
if(A.check_balance(amt)):
    print("amount transacted")

S = Wallet(200)
amt = int(input("insert ammount you wanna spend "))
if(S.check_balance(amt)):
    print("amount transacted and sent to :",A.get_public_key())

"""
