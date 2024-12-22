### Chain.py # richiii
# Contains classes and funcs for implementing blockchain

from Class_Block import *
from Class_Transaction import *
from Cryptography import SHA256
from Wallet import user_wallete


def HashBlock(block: Block):
    """Computes a hash for a block from it's data"""
    block.currHash = SHA256(str(block.unHashed()))
    # print("Hashing Block " + str(block.blockNumber) + ", Nonce: " + str(block.nonce) + " Hash: " + block.currHash[0:8])
    return block


def MineBlock(block: Block | None = None, difficulty: int = 0):
    """Computes a correct hash for a block, according to the provided difficulty"""

    if block is None: return None # If no block provided, return

    difficultyString = "0" * difficulty # difficulty = num of 0's the hash should start with

    # Compute hashes until one meets the difficulty requirement
    block.nonce = 0
    while block.currHash[0:difficulty] != difficultyString:
        _ = HashBlock(block)
        block.nonce += 1

    return block


def mine_block_with_feedback(
    block: Block | None = None,
    difficulty: int = 0,
    nonce: str | None = None,
    feedback: bool = False,
):
    "Computes a correct hash for a block, according to the provided difficulty, returns feedback for each nonce on success or fail"
    if block is None:
        return None

    # difficulty = num of 0's the hash should start with
    difficultyString = "0" * difficulty

    block.nonce = int(nonce) if nonce else 0

    # Compute hashes until one meets the difficulty requirement
    while block.currHash[0:difficulty] != difficultyString:
        _ = HashBlock(block)
        if feedback and block.currHash[0:difficulty] != difficultyString:
            raise Exception(
                f"{block.currHash[0:8]} does not meet difficulty: {difficulty}"
            )
        block.nonce += 1

    return block


class BlockChain:
    def __init__(self):
        self.transactionQueue: list[
            Transaction
        ] = []  # Transactions waiting to be added to blocks
        self.genesisBlock: Block | None = None  # First block in the chain
        self.currBlock: Block | None = None  # Last block in the chain
        self.difficulty: int = (
            3  # How computationally hard must hashes be? (36x exponential)
        )
        # For convienience, users and block references are packaged with the blockchain class
        self.Users: list[user_wallete] = []
        self.blockList: list[Block] = []

    def create_new_user(self):
        a = user_wallete()
        self.Users.append(a)
        return a

    def submitBlock(self, b: Block):
        verified: str = self.VerifyBlock(b)
        if verified != "":
            return verified

        # If the above passed, the block is valid, add it to the chain
        self.blockList.append(b)
        self.currBlock = b
        return "Block added to chain! Hash: " + b.currHash[0:8]

    def VerifyBlock(self, b: Block):
        # Verify Block difficulty
        if b.currHash[0 : self.difficulty] != "0" * self.difficulty:
            return (
                "Block refused, hash: "
                + str(b.currHash[0:8])
                + " does not meet difficulty: "
                + str(self.difficulty)
            )
        # Verify Hash value
        hashedBlock = HashBlock(b)
        if hashedBlock.currHash != b.currHash:
            return (
                "Block refused, hash: "
                + str(b.currHash[0:8])
                + " does not match hash: "
                + str(hashedBlock.currHash[0:8])
                + " (Nonce: "
                + str(b.nonce)
                + ")"
            )
        # Validate Block Transactions
        # for t in b.transactions:
        # 	if (False): # Cannot verify transactions cause we can't get the key CLASS type from the key STRING type
        # 		return "Block refused, unverifiable transaction: " + str(t)
        # Verify Genesis Block
        if self.genesisBlock is None and b.blockNumber != 0:
            return (
                "Block refused, blockNumber: "
                + str(b.blockNumber)
                + " must be 0 for the Genesis Block."
            )
        elif self.genesisBlock is None and b.blockNumber == 0:
            self.genesisBlock = b
            return ""  # Block is valid
        # Verify Block order (if not genesis block)
        elif self.currBlock and (b.blockNumber != (self.currBlock.blockNumber + 1)):
            return (
                "Block refused, blockNumber: "
                + str(b.blockNumber)
                + " does not follow "
                + str(self.currBlock.blockNumber)
            )
        # Verify Hash order (if not genesis block)
        elif self.currBlock and b.prevHash != self.currBlock.currHash:
            return (
                "Block refused, prevHash: "
                + b.prevHash[0:8]
                + " does not match currHash: "
                + self.currBlock.currHash[0:8]
            )

        return ""  # Block is valid

    def ClearChain(self):  # clears the blockchain
        self.blockList = []
        self.transactionQueue = []
        self.currBlock = None
        self.genesisBlock = None
