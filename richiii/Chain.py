### Chain.py # richiii
# Contains classes and funcs for implementing blockchain

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
	def __init__(self):
		self.transactionQueue : list[Transaction] = [] # Transactions waiting to be added to blocks
		self.genesisBlock : Block = None # First block in the chain
		self.currBlock    : Block = None # Last block in the chain
		self.difficulty   : int   = 3    # How computationally hard must hashes be? (36x exponential)
		# For convienience, users and block references are packaged with the blockchain class
		self.Users : list[user_wallete] = []
		self.blockList : list[Block] = []

	def AddUser(u:user_wallete):
		self.Users.append(u)

	def submitBlock(self, b):
		if not (self.VerifyBlock(b)):
			return self.VerifyBlock(b)

		# If the above passed, the block is valid, add it to the chain
		self.blockList.append(b)
		self.currBlock = b
		return "Block added to chain! Hash: " + b.currHash[0:8]

	def VerifyBlock(self, b):
		# Verify Block difficulty
		if(b.currHash[0:self.difficulty] != '0'*self.difficulty):
			return "Block refused, hash: " + str(b.currHash[0:8]) + " does not meet difficulty: " + str(self.difficulty)
		# Verify Hash value 
		hashedBlock = HashBlock(Block(b.blockNumber, b"", b.nonce, b.transactions, b.blockReward, b.rewardAddress, b.prevHash)) 
		if( hashedBlock.currHash != b.currHash):
			return "Block refused, hash: " + str(b.currHash[0:8]) + " does not match hash: " + str(hashedBlock.currHash[0:8]) + " (Nonce: " + str(b.nonce) + ")"
		# Validate Block Transactions
		for t in b.transactions: 
			if (False): # Cannot verify transactions cause we can't get the key CLASS type from the key STRING type
				return "Block refused, unverifiable transaction: " + str(t)
		# Verify Genesis Block
		if(self.genesisBlock == None and b.blockNumber != 0):
			return "Block refused, blockNumber: " + str(b.blockNumber) + " must be 0 for the Genesis Block."
		elif(self.genesisBlock == None and b.blockNumber == 0):
			self.genesisBlock = b
		# Verify Block order (if not genesis block)
		elif(b.blockNumber != (self.currBlock.blockNumber + 1)):
			return "Block refused, blockNumber: " + str(b.blockNumber) + " does not follow " + str(self.currBlock.blockNumber)
		# Verify Hash order (if not genesis block)
		elif(b.prevHash != self.currBlock.currHash):
			return "Block refused, prevHash: " + b.prevHash[0:8] + " does not match currHash: " + self.currBlock.currHash[0:8]
		
		return True # Block is valid

	def ClearChain(): # clears the blockchain
		self.blockList = []
		self.transactionQueue = []
		self.currBlock = None
		self.genesisBlock = None