### Block.py # richiii
# Contains the 'Block' class

from Transaction import Transaction # Transaction class

class Block:
	"""Block in the Blockchain"""
	def __init__(self,blockNumber,currHash,nonce,transactions,blockReward,rewardAddress,prevHash):
		self.blockNumber   = blockNumber
		self.currHash      = currHash
		self.nonce         = nonce
		self.transactions  = transactions
		self.blockReward   = blockReward
		self.rewardAddress = rewardAddress
		self.prevHash      = prevHash

	blockNumber:   int               # The number of this block 
	currHash:      str               # The hash of this block
	nonce:         int               # Randomized data used to compute the hash
	transactions:  list[Transaction] # Data stored in the block
	blockReward:   int               # Reward given to the reward address
	rewardAddress: str               # Address which recieves block award
	prevHash:      str               # Hash of the previous block

	def __str__(self):
		s = ( str(self.blockNumber)  + " "
			+     self.currHash[0:8] + " "
			+ str(self.nonce)        + " "
			+ str(self.blockReward)  + " "
			+     self.rewardAddress + " "
			+     self.prevHash[0:8] + "\n" )
		
		for t in self.transactions:
			s += ("  " + str(t) + "\n")

		return s[:-1] # Dont include the final newline

	def unHashed(self): # Strips the hash and returns the block
		self.currHash = ""
		return self