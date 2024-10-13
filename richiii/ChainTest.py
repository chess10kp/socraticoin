### ChainTest.py # richiii
# Creates 2 blocks of 1 transaction each, 
# the transactions are signed.
# The 1st block being the original block
# and the 2nd block having the correct value for "prevHash"
# The transactions on each block are validated

from richiii.Block import * # Block class
from richiii.Chain import * # MineBlock()
from win.wincringe import * # Transaction class
from maria_compute.RSA_new import * # Signing functions

aPrivate, aPublic = gneratebothkey()
bPrivate, bPublic = gneratebothkey()

t1 = Transaction("A", "B", 100, b"", 10)
t1.signature = RSA_sig(aPrivate, str(t1).encode('utf-8') )

t2 = Transaction("B", "C", 50, b"", 5)
t2.signature = RSA_sig(bPrivate, str(t2).encode('utf-8') )

print("T1: " + str(t1))
print("T2: " + str(t2))

block1 = Block(0, "", 999, [t1], 100, "A", "Original_Block")
MineBlock(block1, 4)

block2 = Block(1, "", 999, [t2], 100, "A", block1.currHash)
MineBlock(block2, 2)

print("Block 1: " + str(block1))
verify_sig(aPublic, t1.signature, str(unsigned(t1)).encode('utf-8'))

print("Block 2: " + str(block2))
verify_sig(bPublic, t2.signature, str(unsigned(t2)).encode('utf-8'))
