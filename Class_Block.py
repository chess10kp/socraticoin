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

	# Prints the block with it's information
	def prettyPrint(self):
		 print(f"+----BLOCK NO.{self.blockNumber:4d}----+")
		 print(f"| HASH:   {self.currHash[0:4]}...{self.currHash[-4:]} |")
		 print(f"| PREV:   {self.prevHash[0:4]}...{self.prevHash[-4:]} |")
		 print("+---------------------+")
		 print(f"| NONCE: {self.nonce:12d} |")
		 print(f"| REWARD: {self.blockReward:11d} |")
		 print(f"| RWD TO: {self.rewardAddress[0:4]}...{self.rewardAddress[-4:]} |")
		 print("+---------------------+")