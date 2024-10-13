#create a create wallet that returns the funciton it'sef
from maria_compute.RSA_new import * 

class user_wallete:
    def __init__(self,ammount_of_crypto):
        self.private_key, self.public_key = gneratebothkey()
        self.ammount_of_crypto = ammount_of_crypto

    def get_public_key(self):
        return self.public_key
    def get_private_key(self):
        return self.private_key
    def get_crypto(self):
        temp= int(self.ammount_of_crypto)
        return temp
    
    def check_balance(self,amt):
        
        if (self.get_crypto() - amt) < 0:
           ##  print("broke boy")
             return False
        else:
            return True

'''
A = user_wallete(0)
addr = A.get_public_key()
sign = A.get_private_key()
amt = int(input("insert ammount you wanna spend "))
if(A.check_balance(amt)):
    print("amount transacted")

S = user_wallete(200)
amt = int(input("insert ammount you wanna spend "))
if(S.check_balance(amt)):
    print("amount transacted and sent to :",A.get_public_key())

'''