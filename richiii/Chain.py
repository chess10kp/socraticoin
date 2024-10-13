### Chain.py # richiii
# Contains classes and funcs for making implementing blockchain

from richiii.Block import * # Block class
from win.wincringe import * # Transaction class
from maria_compute.RSA_new import * # Hashing / Signing functions
from maria_compute.wallet  import * # Wallets


def HashBlock(block:Block):
	"""Computes a hash for a block from it's data"""
	block.currHash = SHA256(str(block.unHashed())) 
	print("Hashing Block " + str(block.blockNumber) + ", Nonce: " + str(block.nonce) + " Hash: " + block.currHash[0:8])
	return block

def MineBlock(block:Block = None, difficulty = 0):
	"""Computes a correct hash for a block, according to the provided difficulty"""

	if (block == None): # If no block provided, return
		return None

	# difficulty = num of 0's the hash should start with
	difficultyString = '0'*difficulty 

	# Compute hashes until one meets the difficulty requirement
	block.nonce = 0
	while(block.currHash[0:difficulty] != difficultyString): 
		HashBlock(block)
		block.nonce += 1

	return block

class BlockChain:
	transactionQueue : list[Transaction] = [] # Transactions waiting to be added to blocks
	genesisBlock : Block = None # First block in the chain
	currBlock    : Block = None # Last block in the chain
	difficulty   : int   = 3    # How computationally hard must hashes be?

	# For convienience, users are packaged with the blockchain
	Users = list[user_wallete]

	def AddUser(u:user_wallete):
		Users.append(u)

	def submitBlock(self, b):
		self.VerifyBlock(b)

		# If the above passed, the block is valid, add it to the chain
		self.currBlock = b
		return "Block added to chain! Hash: " + b.currHash[0:8]

	def VerifyBlock(self, b):
		# Verify Block difficulty
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