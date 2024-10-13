### Block.py # richiii
# Contains the 'Block' data structure

from win.wincringe import Transaction # Transaction class

class Block:
	"""Block in the Blockchain"""
	def __init__(self,a,b,c,d,e,f,g):
		self.blockNumber   = a
		self.currHash      = b
		self.nonce         = c
		self.transactions  = d
		self.blockReward   = e
		self.rewardAddress = f
		self.prevHash      = g

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

		return s

	def unHashed(self): # Strips the hash and returns the block
		self.currHash = ""
		return self