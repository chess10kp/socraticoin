### FailTests.py # richiii
# Tests all the failure cases for adding a block
# Turn of printing from MineBlock() when running this

from richiii.Block import * # Block class
from richiii.Chain import * # BlockChain class & block hashing funcs
from win.wincringe import * # Transaction class
from maria_compute.RSA_new import * # Signing functions

# Create a blockchain and 3 users
blockChain = BlockChain()
UserA = user_wallete()
UserB = user_wallete()
UserC = user_wallete()

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

# Invalid block 1: non-difficult hash
print(blockChain.submitBlock(Block(0, "easyHash", 0, [], 100, UserA.get_public_str(), "Genesis_Block")))

# Invalid block 2: Spoofed difficult hash
print(blockChain.submitBlock(Block(0, "0000000hardHash", 0, [], 100, UserA.get_public_str(), "Genesis_Block")))

# Invalid block 3: Valid block with invalid transaction
# Transaction validation is not yet implemented

# Invalid block 4: Invalid Genesis Block Number
print(blockChain.submitBlock(MineBlock(Block(999, "", 0, [], 100, UserA.get_public_str(), "Genesis_Block"), blockChain.difficulty)))

# Invalid block 5: Invalid Block Order
blockChain.submitBlock(MineBlock(Block(0, "", 0, [], 100, UserA.get_public_str(), "Genesis_Block"), blockChain.difficulty))
print(blockChain.submitBlock(MineBlock(Block(8, "", 0, [], 100, UserA.get_public_str(), blockChain.currBlock.prevHash), blockChain.difficulty)))

# Invalid block 6: Invalid Hash Order
print(blockChain.submitBlock(MineBlock(Block(1, "", 0, [], 100, UserA.get_public_str(), "notPrevHash"), blockChain.difficulty)))