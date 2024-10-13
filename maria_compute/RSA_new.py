#IGAVEUP 
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding, ec
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import utils
import hashlib

def gneratebothkey():
    private_key = ec.generate_private_key(
        ec.SECP384R1()
    )
    public_key = private_key.public_key()
    return private_key, public_key

def RSA_sig(pk,dat):

    signature = pk.sign(

        dat,

        ec.ECDSA(hashes.SHA256())

    )
    #####print("signiture is this: ",signature)
    return signature

##########################3
def verify_sig(public_key,signature,data):

    try:
        public_key.verify(signature,data,ec.ECDSA(hashes.SHA256()))

        ballon= True
    except Exception as e:
       ballon =  False
    if ballon == True:
        print("valid")
    else:
        print("invalid")

def SHA256(msg : str)->str:
    # print(type(hashlib.sha256(msg.encode()).hexdigest()))
    return hashlib.sha256(msg.encode()).hexdigest()


##################### test caseas
'''
private_key,public_key = gneratebothkey()
data = b'here'
sig = RSA_sig(private_key,data)
verify_sig(public_key,sig,data)
'''