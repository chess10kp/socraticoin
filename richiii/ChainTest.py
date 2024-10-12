### ChainTest.py # richiii
# Creates 2 blocks of 1 transaction each, 
# the transactions are signed.
# The 1st block being the original block
# and the 2nd block having the correct value for "prevHash"

from richiii.Block import * # Block class
from win.wincringe import * # Transaction class
from maria_compute.RSA import * # Signing functions

APrivateKey = "privateA"
BPrivateKey = "privateB"

t1 = Transaction("A", "B", 100, "", 10)
t1.signed = createsig(str(t1), APrivateKey)

t2 = Transaction("B", "C", 50,  0, 5)
t2 = signed = createsig(str(t2), BPrivateKey)


block1 = Block(0, "", 999, [t1], 100, "A", "Original_Block")
block1.currHash = SHA1(str(block1))

block2 = Block(1, "", 999, [t2], 100, "A", block1.currHash)
block2.currHash = SHA1(str(block2))

print(block1)
print(block2)

