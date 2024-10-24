# IGAVEUP
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.dsa import DSAPrivateKey, DSAPublicKey
from cryptography.hazmat.primitives import serialization
import hashlib


def gneratebothkey():
    private_key = ec.generate_private_key(ec.SECP384R1())
    public_key = private_key.public_key()

    return private_key, public_key


def pub_to_str(pub: serialization.SSHPublicKeyTypes) -> str:
    public_key_as_bytes = pub.public_bytes(
        serialization.Encoding.OpenSSH, serialization.PublicFormat.OpenSSH
    )
    return public_key_as_bytes.decode("utf-8")


def priv_to_str(priv: DSAPrivateKey) -> str:
    private_key_as_bytes: bytes = priv.private_bytes(
        serialization.Encoding.PEM,
        serialization.PrivateFormat.TraditionalOpenSSL,
        serialization.BestAvailableEncryption(b"emacs"),
    )
    return private_key_as_bytes.decode("utf-8")


def RSA_sig(pk: DSAPrivateKey, dat: bytes) -> bytes:
    signature = pk.sign(
        dat,
        ec.ECDSA(hashes.SHA256()),  # pyright: ignore[reportArgumentType]
    )
    return signature


##########################3
def verify_sig(public_key: DSAPublicKey, signature: bytes, data: bytes):
    try:
        public_key.verify(signature, data, ec.ECDSA(hashes.SHA256()))  # pyright: ignore[reportArgumentType]

        ballon = True
    except Exception:
        ballon = False
    if ballon is True:
        print("valid")
    else:
        print("invalid")


def SHA256(msg: str) -> str:
    # print(type(hashlib.sha256(msg.encode()).hexdigest()))
    return hashlib.sha256(msg.encode()).hexdigest()


##################### test caseas

# private_key,public_key = gneratebothkey()


# data = b'here'
# sig = RSA_sig(private_key,data)
# verify_sig(public_key,sig,data)

