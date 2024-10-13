### Chain.py # richiii
# Contains classes and funcs for making implementing blockchain

from richiii.Block import * # Block class
from win.wincringe import * # Transaction class
from maria_compute.RSA_new import * # Signing functions

def MineBlock(block = None, difficulty = 0): # diff = num of 0's starting hash
	if (block == None): # If no block provided, return
		return None

	# Compute hashes until find one that meets difficulty requirements
	stringMatch = '0'*difficulty
	block.nonce = 0
	while (currHash[0:difficulty] != stringMatch ):
		block.nonce += 1
		currHash = SHA256(str(block))
		print(currHash)

	block.currHash = currHash # Once a valid hash is found, set the hash on the block
	return block

class BlockChain:
	transactionQueue : list[Transaction] = []
	genesisBlock = None
	currBlock = None
	difficulty = 3

	# users = User]

	# def AddUser(u:User):
	# 	return

	def submitBlock(b):
		# Verify Block meets difficulty
		if(b.currHash[0:difficulty] != '0'*difficulty):
			return "Block refused, hash: " + str(b.currHash[0:8]) + " does not meet difficulty: " + str(difficulty)
		# Verify Block order
		if(b.blockNumber != (currBlock.blockNumber + 1)):
			return "Block refused, blockNumber: " + str(b.blockNumber) + " does not follow " + str(currBlock.blockNumber)
		# Verify Hash order
		if(b.prevHash != currBlock.currHash):
			return "Block refused, prevHash: " + str(b.prevHash[0:8]) + " does not match currHash: " + str(currBlock.currHash[0:8])
		# Verify Hash value 
		# if (tempblock.currHash hashed with b.currhash removed != currhash)
			# return "Block refused, hash: " + str(b.currHash[0:8]) + " does not match hash: " + str(newBlock.currHash[0:8]) + " (Nonce: " + str(b.nonce) + ")"
		# Validate Block Transactions
		# for loop t in transactionlist 
			# if t sign cannot be verified by t.sender (which is the pubkey)
				# return "Block refused, unverifiable transaction: " + str(t)

		# If all the above passed, the block is valid, add it to the chain
		if(genesisBlock == None):
			genesisBlock = b

		currBlock = b