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

UserA.get_public_str_full()

# Create example transactions
t1 = (Transaction(UserA.get_public_str(), UserB.get_public_str(), 100, 10)).Sign(UserA.get_private_key())
t2 = (Transaction(UserB.get_public_str(), UserC.get_public_str(), 50, 5)).Sign(UserB.get_private_key())
t3 = (Transaction(UserC.get_public_str(), UserA.get_public_str(), 25, 15)).Sign(UserC.get_private_key())
t4 = (Transaction(UserB.get_public_str(), UserA.get_public_str(), 50, 5)).Sign(UserB.get_private_key())
t5 = (Transaction(UserA.get_public_str(), UserC.get_public_str(), 5, 1)).Sign(UserA.get_private_key())

# Submit transactions to the transaction queue
# blockChain.transactionQueue.append(t1)
# blockChain.transactionQueue.append(t2)
# blockChain.transactionQueue.append(t3)

# Create Genesis Block
blockChain.submitBlock(MineBlock(Block(0, "", 0, [], 100, UserA.get_public_str(), "Genesis_Block"), blockChain.difficulty))

# Create test block 1&2 with transactions
blockChain.submitBlock(MineBlock(Block(1, "", 0, [t1, t2, t3], 100, UserA.get_public_str(), blockChain.currBlock.currHash), blockChain.difficulty))
blockChain.submitBlock(MineBlock(Block(2, "", 0, [t4, t5], 100, UserA.get_public_str(), blockChain.currBlock.currHash), blockChain.difficulty))

# Print & Verify
for block in blockChain.blockList:
	print("Block " + str(block.blockNumber) + ": " + str(block))
verify_sig(UserA.get_public_key(), t1.signature, str(unsigned(t1)).encode('utf-8'))
verify_sig(UserB.get_public_key(), t2.signature, str(unsigned(t2)).encode('utf-8'))
verify_sig(UserC.get_public_key(), t3.signature, str(unsigned(t3)).encode('utf-8'))
verify_sig(UserB.get_public_key(), t4.signature, str(unsigned(t4)).encode('utf-8'))
verify_sig(UserA.get_public_key(), t5.signature, str(unsigned(t5)).encode('utf-8'))