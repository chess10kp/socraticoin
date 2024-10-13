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
	currHash = ""
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

	def submitBlock(self, b):
		# Verify Block meets difficulty
		if(b.currHash[0:self.difficulty] != '0'*self.difficulty):
			return "Block refused, hash: " + str(b.currHash[0:8]) + " does not meet difficulty: " + str(self.difficulty)
		# Verify Hash value 
		# if (tempblock.currHash hashed with b.currhash removed != currhash)
			# return "Block refused, hash: " + str(b.currHash[0:8]) + " does not match hash: " + str(newBlock.currHash[0:8]) + " (Nonce: " + str(b.nonce) + ")"
		# Validate Block Transactions
		# for loop t in transactionlist 
			# if t sign cannot be verified by t.sender (which is the pubkey)
				# return "Block refused, unverifiable transaction: " + str(t)
		# Verify Genesis Block
		if(self.genesisBlock == None):
			self.genesisBlock = b
		# Verify Block order (if not genesis block)
		elif(b.blockNumber != (self.currBlock.blockNumber + 1)):
			return "Block refused, blockNumber: " + str(b.blockNumber) + " does not follow " + str(self.currBlock.blockNumber)
		# Verify Hash order (if not genesis block)
		elif(b.prevHash != self.currBlock.currHash):
			return "Block refused, prevHash: " + b.prevHash[0:8] + " does not match currHash: " + self.currBlock.currHash[0:8]

		# If all the above passed, the block is valid, add it to the chain
		self.currBlock = b
		return "Block added to chain! Hash: " + b.currHash[0:8]