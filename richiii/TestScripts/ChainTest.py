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

# Create a blockchain and 3 users
blockChain = BlockChain()
UserA = user_wallete()
UserB = user_wallete()
UserC = user_wallete()

# Create example transactions
t1 = Transaction(UserA.get_public_key_str(), UserB.get_public_key_str, 100, b"", 10)
t1.signature = RSA_sig(UserA.get_private_key(), str(t1).encode('utf-8') )
t2 = Transaction(UserB.get_public_key_str(), UserC.get_public_key_str(), 50, b"", 5)
t2.signature = RSA_sig(UserB.get_private_key(), str(t2).encode('utf-8') )
t3 = Transaction(UserC.get_public_key_str(), UserA.get_public_key_str(), 25, b"", 15)
t3.signature = RSA_sig(UserC.get_private_key(), str(t3).encode('utf-8') )

# Submit transactions to the transaction queue
blockChain.transactionQueue.append(t1)
blockChain.transactionQueue.append(t2)
blockChain.transactionQueue.append(t3)

# Create Genesis Block
blockChain.submitBlock(MineBlock(Block(0, "", 0, [], 100, "A", "Genesis_Block"), blockChain.difficulty))

# Create test block with transactions
blockChain.submitBlock(MineBlock(Block(1, "", 999, [t1, t2, t3], 100, "A", blockChain.currBlock.currHash), blockChain.difficulty))

# Print & Verify
print("Block 0: " + str(blockChain.genesisBlock))
print("Block 1: " + str(blockChain.currBlock))
verify_sig(UserA.get_public_key(), t1.signature, str(unsigned(t1)).encode('utf-8'))
verify_sig(UserB.get_public_key(), t2.signature, str(unsigned(t2)).encode('utf-8'))
verify_sig(UserB.get_public_key(), t3.signature, str(unsigned(t2)).encode('utf-8'))
