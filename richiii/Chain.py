### Chain.py # richiii
# Contains controls for making a blockchain

from maria_compute.RSA_new import * # Signing functions

def MineBlock(block, difficulty = 1): # diff = num of 0's starting hash
	# block = Block(0, "", 999, [t1], 100, "A", "Original_Block")

	block.nonce = 0
	currHash = SHA256(str(block))
	print(currHash)

	stringMatch = '0'*difficulty
	while (currHash[0:difficulty] != stringMatch ):
		block.nonce += 1
		currHash = SHA256(str(block))
		print(currHash)

	block.currHash = currHash
