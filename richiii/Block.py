### Block.py # richiii
# Contains the 'Block' data structure

from dataclasses import dataclass
from win.wincringe import * # Transaction class

@dataclass
class Block:
	"""Block in the Blockchain"""
	def __init__(self,a,b,c,d,e,f,g):
		self.blockNumber = a
		self.currHash = b
		self.nonce = c
		self.data = d
		self.blockReward = e
		self.rewardAddress = f
		self.prevHash = g

	blockNumber:   int               # The number of this block 
	currHash:      str               # The hash of this block
	nonce:         int               # Randomized data used to compute the hash
	data:          list[Transaction] # Data stored in the block
	blockReward:   int               # Reward given to the reward address 
	rewardAddress: str               # Address which recieves block award
	prevHash:      str               # Hash of the previous block (by number)

	def __str__(self):
		s = ( str(self.blockNumber)  + " "
			+     self.currHash[0:8] + " "
			+ str(self.blockReward)  + " "
			+     self.rewardAddress + " "
			+     self.prevHash[0:8] + " "
			+ str(self.nonce)        + "\n" )
		
		for t in self.data:
			s += ("  " + str(t))

		return s