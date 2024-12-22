### Class_Chain.py # richiii
# Contains 'BlockChain' class and mining funcs for implementing blockchain

from Class_Block import *
from Class_Wallet import *
from Cryptography import SHA256

def HashBlock(block: Block, printHash: bool = False):
    """Computes a hash for a block from it's data"""
    block.currHash = SHA256(str(block.unHashed())) # Need to input the unhashed form of the block, otherwise invalid
    if printHash: print("Hashing Block " + str(block.blockNumber) + ", Nonce: " + str(block.nonce) + " Hash: " + block.currHash[0:8])
    return block

def MineBlock(block: Block | None = None, difficulty: int = 0, nonce: str | None = None, feedback: bool = False, printHashes: bool = False):
    """Computes a correct hash for a block, according to the provided difficulty.\n 
    If set, prints feedback for each nonce on success or fail"""

    if block is None: 
        print("Tried to mine None!")
        return None # If no block provided, return

    difficultyString = "0" * difficulty # difficulty = num of 0's the hash should start with
    block.nonce = int(nonce) if nonce else 0 # starts from 0 by default

    while block.currHash[0:difficulty] != difficultyString: # Compute hashes until one meets the difficulty requirement
        block = HashBlock(block)
        block.nonce += 1
        if feedback and block.currHash[0:difficulty] != difficultyString: raise Exception(f"{block.currHash[0:8]} does not meet difficulty: {difficulty}")

    return block

class BlockChain:
    def __init__(self):
        self.transactionQueue: list[Transaction] = []  # Transactions waiting to be added to blocks
        self.genesisBlock: Block | None = None  # First block in the chain
        self.currBlock: Block | None = None  # Last block in the chain
        self.difficulty: int = 3  # How computationally hard must hashes be? (36x exponential)
        
        self.Users: list[Wallet] = [] # For convienience, users and block references are packaged with the blockchain class
        self.blockList: list[Block] = []

    def create_new_user(self):
        a = Wallet()
        self.Users.append(a)
        return a

    def submitBlock(self, b: Block):
        if self.VerifyBlock(b) != "": return self.VerifyBlock(b)

        # If the above passed: the block is valid, add it to the chain
        self.blockList.append(b)
        self.currBlock = b
        if self.genesisBlock == None: self.genesisBlock = b

        return f"Block added to chain! Hash '{b.currHash[0:8]}'"

    def VerifyBlockDifficulty(  self, b: Block): return (b.currHash[0:self.difficulty]) == ("0" * self.difficulty)
    def VerifyBlockHash(        self, b: Block): return (HashBlock(b).currHash)         == (b.currHash)
    def VerifyBlockGenesis(     self, b: Block): return (self.genesisBlock is None)    and (b.blockNumber == 0)
    def VerifyBlockOrder(       self, b: Block): return (b.blockNumber == 0)            or (b.blockNumber == (self.currBlock.blockNumber + 1))
    def VerifyBlockHashOrder(   self, b: Block): return (b.prevHash == "Genesis_Block") or (b.prevHash == self.currBlock.currHash)
    def VerifyBlockTransactions(self, b: Block):
        for t in b.transactions:
            if (False): # TODO: Cannot verify transactions cause we can't get the key CLASS type from the key STRING type
                return "Block refused, unverifiable transaction: " + str(t)
        return True # Currently always returns true

    def VerifyBlock(self, b: Block): 
        """Verifies the block by checking all the block's attributes"""
        if   not self.VerifyBlockDifficulty(  b): return f"Block Refused: '{b.currHash[0:8]}' does not match difficulty: {self.difficulty}"
        elif not self.VerifyBlockHash(        b): return f"Block Refused: '{b.currHash[0:8]}' does not match computed hash: '{hashedBlock.currHash[0:8]}'"
        elif not self.VerifyBlockGenesis(     b): return f"Block Refused: B# '{b.blockNumber}' must be 0 for the the Genesis Block"
        elif not self.VerifyBlockOrder(       b): return f"Block Refused: B# '{b.blockNumber}' must follow previous in chain '{self.currBlock.blockNumber}'"
        elif not self.VerifyBlockHashOrder(   b): return f"Block Refused: prevHash '{b.prevHash[0:8]}' does not match currHash '{self.currBlock.currHash[0:8]}'"
        elif not self.VerifyBlockTransactions(b): return f"Block Refused: Invalid Transaction detected"
        
        return ""  # Block is valid

    def Clear(self):
        """Clears the blockchain"""
        self.blockList = []
        self.transactionQueue = []
        self.currBlock = None
        self.genesisBlock = None
