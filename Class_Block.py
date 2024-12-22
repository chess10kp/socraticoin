### Class_Block.py # richiii
# Contains the 'Block' class

from Class_Transaction import * # Transaction class

class Block: 
	"""Block in the Blockchain"""
	def __init__(self, blockNumber, currHash, nonce, transactions, blockReward, rewardAddress, prevHash):
		self.blockNumber:   int = blockNumber   # The number of this block 
		self.currHash:      str = currHash      # The hash of this block
		self.nonce:         int = nonce         # Randomized data used to compute the hash
		self.blockReward:   int = blockReward   # Reward given to the reward address
		self.rewardAddress: str = rewardAddress # Address which recieves block award
		self.prevHash:      str = prevHash      # Hash of the previous block
		self.transactions: list[transactions] = transactions # Data stored in the block

	def __str__(self):
		s = f"{self.blockNumber} {self.currHash[0:8]} {self.nonce} {self.blockReward} {self.rewardAddress} {self.prevHash[0:8]}\n"
		for t in self.transactions: s += ("  " + str(t) + "\n")
		return s[:-1] # Dont include the final newline

	# Strips the hash and returns the block
	def unHashed(self): return Block(self.blockNumber, "", self.nonce, self.transactions, self.blockReward, self.rewardAddress, self.prevHash)
