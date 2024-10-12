import math
import hashlib

from win.wincringe import *

p = 3
q = 7
n = p*q
e = 2
phi = (p-1) * (p-q)

def gcd(a,h):
    temp  = 0
    while(True):
        temp = a%h
    if(temp == 0):
        return h
    a = h = temp

########################create the keys
def pic_public(phi):
    input(e)
    while (e < phi):
        if(gcd(e,phi)==1):
            break
        else:
            e = e+1
    return e



def calculate_privatekey(e):
    k=2
    d=(1+(k*phi))/e
    return d
def encrypt(msg):
    print("here mesage ",msg)
    c = pow(msg,e)
    c = math.fmod(c,n)
    print("encrypted data = ", c)


##########################################################


#BARROWED FROM STACK OVERFLOW
def SHA1(msg : str)->str:
    return hashlib.sha1(msg.encode()).hexdigest()

def check_if_work(hashofmessage,signiture,publickey):
    hashfromsig = pow(signiture,publickey,n)
   
    if(hashofmessage == signiture):
        print("VALID")
        return True
    else:
        print("INVLAID")
        return False
def generate_sig(hash,d,n):
    pow(hash,d,n)

################

def setup_pub_and_private():
    e = pic_public(phi)
    print("here is youur public : ",e)
    d = calculate_privatekey(e)
    print("here is your private key : ",d)

    return e,d
def createmsg(sender,amount,reciever):
    msg = sender+amount+reciever
    return msg

def createsig(msg,d):
    
    print("encrypt ", msg)
    hash = SHA1(msg)
    signiture = generate_sig(hash,d,n)
    return signiture

def verify(hash,signiture,e):

    print("signiture: ",hex(signiture))

    test = check_if_work(hash,signiture,e)
    return test
