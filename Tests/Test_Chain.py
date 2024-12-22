### Test_Chain.py # richiii
# Creates 3 example blocks 
# The 1st block being the original block
# and the 2nd/3rd blocks having the correct value for "prevHash"
# The transactions on each block are signed & validated

from Block import * # Block class
from Chain import * # BlockChain class & block hashing funcs
from Transaction import * # Transaction class
from RSA_new import * # Signing functions

# Create a blockchain and 3 users
blockChain = BlockChain()
UserA = blockChain.create_new_user()
UserB = blockChain.create_new_user()
UserC = blockChain.create_new_user()

# Create example transactions
t1 = (Transaction(UserA.get_public_str(), UserB.get_public_str(), 100, 10)).Sign(UserA.get_private_key())
t2 = (Transaction(UserB.get_public_str(), UserC.get_public_str(), 50, 5)  ).Sign(UserB.get_private_key())
t3 = (Transaction(UserC.get_public_str(), UserA.get_public_str(), 25, 15) ).Sign(UserC.get_private_key())
t4 = (Transaction(UserB.get_public_str(), UserA.get_public_str(), 50, 5)  ).Sign(UserB.get_private_key())
t5 = (Transaction(UserA.get_public_str(), UserC.get_public_str(), 5, 1)   ).Sign(UserA.get_private_key())

# Submit transactions to the transaction queue
# blockChain.transactionQueue.append(t1)
# blockChain.transactionQueue.append(t2)
# blockChain.transactionQueue.append(t3)

# Create Genesis Block (block 0), no previous hash
blockChain.submitBlock(MineBlock(Block(0, "", 0, [], 100, UserA.get_public_str(), "Genesis_Block"), blockChain.difficulty))
# Create test block 1&2 with transactions
blockChain.submitBlock(MineBlock(Block(1, "", 0, [t1, t2, t3], 100, UserA.get_public_str(), blockChain.currBlock.currHash), blockChain.difficulty))
blockChain.submitBlock(MineBlock(Block(2, "", 0, [t4, t5], 100, UserA.get_public_str(), blockChain.currBlock.currHash), blockChain.difficulty))

# Print & Verify
for block in blockChain.blockList:
	print("Block " + str(block.blockNumber) + ": " + str(block))
t1.Verify(UserA.get_public_key())
t2.Verify(UserB.get_public_key())
t3.Verify(UserC.get_public_key())
t4.Verify(UserB.get_public_key())
t5.Verify(UserA.get_public_key())
for u in blockChain.Users:
	print("User: " + u.get_public_str())