### Test_Wallet.py # Maria
# Tests making 2 wallets and their keys

from Class_Wallet import *

A = Wallet(0)

addr = A.get_public_key()
sign = A.get_private_key()
amt = int(input("insert ammount you wanna spend "))
if(A.check_balance(amt)): print("amount transacted")

S = Wallet(200)
amt = int(input("insert ammount you wanna spend "))
if(S.check_balance(amt)): print("amount transacted and sent to :",A.get_public_key())
