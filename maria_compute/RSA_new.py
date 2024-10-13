#IGAVEUP 
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding, ec
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import utils
import hashlib

#private_key = rsa.generate_private_key(
 #   public_exponent=65537,
  #  key_size=2048
#)
def gneratebothkey():
    private_key = ec.generate_private_key(
        ec.SECP384R1()
    )
    public_key = private_key.public_key()
    return private_key, public_key

def RSA_sig(pk,dat):

    signature = pk.sign(

        data,

        ec.ECDSA(hashes.SHA256())

    )
    print("signiture is this: ",signature)
    return signature


def verify(signature,public_key):
    chosen_hash = hashes.SHA256()
    digest = hashes.Hash(chosen_hash)

    public_key.verify(

        signature,

        digest,

        ec.ECDSA(utils.Prehashed(chosen_hash))

    )
