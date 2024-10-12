### Block.py # richiii
# Contains the 'Block' data structure

from dataclasses import dataclass
from win import wincringe

@dataclass
class Block:
	"""Block in the Blockchain"""
	blockNumber:   int           # The number of this block 
	currHash:      str           # The hash of this block
	nonce:         int           # Randomized data used to compute the hash
	data:          [Transaction] # Data stored in the block
	blockReward:   int           # Reward given to the reward address 
	rewardAddress: str           # Address which recieves block award
	prevHash:      str           # Hash of the previous block (by number)


x = Transaction("A", "B", 100, 0, 10)

print(x.sender)