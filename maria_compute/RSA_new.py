#IGAVEUP 
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding, ec
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.ec import EllipticCurveSignatureAlgorithm
from cryptography.hazmat.primitives.asymmetric import utils
import hashlib

def gneratebothkey():
    private_key = ec.generate_private_key(
        ec.SECP384R1()
    )
    public_key = private_key.public_key()
    # serialization.Encoding.PEM
    # BestAvailableEncryption
    private_key_as_bytes = private_key.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.TraditionalOpenSSL, serialization.BestAvailableEncryption(b"emacs"))
    private_key_as_string = private_key_as_bytes.decode("utf-8")

    public_key_as_bytes = public_key.public_bytes(serialization.Encoding.OpenSSH, serialization.PublicFormat.OpenSSH)
    public_key_as_string = public_key_as_bytes.decode("utf-8")

    privString = private_key_as_string[-40:-36]
    pubString = public_key_as_string[-40:-36]

    # print(privString)
    # print(pubString)

    return privString, pubString
gneratebothkey()

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