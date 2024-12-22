### Wallet.py # Maria
# create a create wallet that returns the funciton it'sef

from Cryptography import pub_to_str, priv_to_str, gneratebothkey


class user_wallete:
    def __init__(self):
        self.private_key, self.public_key = gneratebothkey()
        self.ammount_of_crypto = 0

    def get_public_key(self):
        return self.public_key

    def get_private_key(self):
        return self.private_key

    def get_public_str(self):
        return pub_to_str(self.public_key)[-40:-36]

    def get_private_str(self):
        return priv_to_str(self.private_key)[-40:-36]

    def get_public_str_full(self):
        return pub_to_str(self.public_key)

    def get_private_str_full(self):
        return priv_to_str(self.private_key)

    def get_crypto(self):
        temp = int(self.ammount_of_crypto)
        return temp

    def check_balance(self, amt):
        if (self.get_crypto() - amt) < 0:
            ##  print("broke boy")
            return False
        else:
            return True


"""
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

"""
