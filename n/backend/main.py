from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from richiii.Block import Block
from richiii.Chain import BlockChain, MineBlock, mine_block_with_feedback
from win.wincringe import Transaction


blockChain = None

app = FastAPI(
    title="Socraticoin",
    description="An Educational Cryptocurrency",
    version="0.0.1",
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)


@app.get("/hash")
async def new_hash():
    if not blockChain:
        initialize_chain()
    pass


@app.get("/")
def initialize_chain():
    global blockChain
    # Create a blockchain and 3 users
    blockChain = BlockChain()
    blockChain = BlockChain()
    UserA = blockChain.create_new_user()
    UserB = blockChain.create_new_user()
    UserC = blockChain.create_new_user()

    # Create example transactions
    t1 = (Transaction(UserA.get_public_str(), UserB.get_public_str(), 100, 10)).Sign(
        UserA.get_private_key()
    )
    t2 = (Transaction(UserB.get_public_str(), UserC.get_public_str(), 50, 5)).Sign(
        UserB.get_private_key()
    )
    t3 = (Transaction(UserC.get_public_str(), UserA.get_public_str(), 25, 15)).Sign(
        UserC.get_private_key()
    )
    t4 = (Transaction(UserB.get_public_str(), UserA.get_public_str(), 50, 5)).Sign(
        UserB.get_private_key()
    )
    t5 = (Transaction(UserA.get_public_str(), UserC.get_public_str(), 5, 1)).Sign(
        UserA.get_private_key()
    )

    # Submit transactions to the transaction queue
    # blockChain.transactionQueue.append(t1)
    # blockChain.transactionQueue.append(t2)
    # blockChain.transactionQueue.append(t3)

    # Create Genesis Block (block 0), no previous hash
    blockChain.submitBlock(
        MineBlock(
            Block(0, "", 0, [], 100, UserA.get_public_str(), "Genesis_Block"),
            blockChain.difficulty,
        )
    )
    # Create test block 1&2 with transactions
    blockChain.submitBlock(
        MineBlock(
            Block(
                1,
                "",
                0,
                [t1, t2, t3],
                100,
                UserA.get_public_str(),
                blockChain.currBlock.currHash,
            ),
            blockChain.difficulty,
        )
    )
    blockChain.submitBlock(
        MineBlock(
            Block(
                2,
                "",
                0,
                [t4, t5],
                100,
                UserA.get_public_str(),
                blockChain.currBlock.currHash,
            ),
            blockChain.difficulty,
        )
    )

    # Print & Verify
    t1.Verify(UserA.get_public_key())
    t2.Verify(UserB.get_public_key())
    t3.Verify(UserC.get_public_key())
    t4.Verify(UserB.get_public_key())
    t5.Verify(UserA.get_public_key())
    return {"message": "Blockchain initialized"}


@app.get("/blockchain")
def get_blockchain():
    if not blockChain:
        initialize_chain()
    nodes: dict[list]
    nodes = {}
    for i, node in enumerate(blockChain.blockList):
        print(node)
        parsed = parse_block_info(node)
        # self.sender = sender
        # self.reciever = reciever
        # self.amount = amount
        # self.signature = b""
        # self.gasFee = gasFee
        parsed["transactions"] = [
            [
                transaction.sender,
                transaction.reciever,
                transaction.amount,
                transaction.signature.hex(),
                transaction.gasFee,
            ]
            for transaction in parsed["transactions"]
        ]
        nodes[i] = parsed
    return nodes


@app.get("/transactions")
async def get_all_transactions():
    transactions = []
    if not blockChain:
        initialize_chain()
    for transaction in blockChain.transactionQueue:
        transactions.append(
            [
                transaction.sender,
                transaction.reciever if transaction.reciever is not None else "",
                transaction.amount,
                str(transaction.signature.hex())[-4:],
                transaction.gasFee,
            ]
        )

    return {"transactions": transactions}


def parse_block_info(block: Block):
    info = {}
    info["id"] = block.blockNumber
    info["hash"] = block.currHash
    info["nonce"] = block.nonce
    info["reward"] = block.blockReward
    info["prevHash"] = block.prevHash
    info["transactions"] = [transaction for transaction in block.transactions]
    return info


@app.get("/get_last_two_blocks")
def get_two_blockchain_nodes():
    if not blockChain:
        initialize_chain()
        # TODO:
    return {"prevBlock": {}, "currBlock": {}}


@app.get("/rand_user")
def get_random_user_that_isnt_me():
    if not blockChain:
        initialize_chain()
    for user in blockChain.Users:
        if user.get_public_str() != blockChain.Users[0].get_public_str():
            key = user.get_public_str_full()
            return {"random_user": key[key.find(" ") + 1 :]}


class TransactionParams(BaseModel):
    address: str
    send_address: str
    amount_to_send: str
    sign: str
    gas: str


class TransactionToMineParams(BaseModel):
    blockNumber: int
    transaction_hash: str
    nonce: str
    reward: str
    reward_address: str


@app.get("/public_key")
def get_public_key():
    if not blockChain:
        initialize_chain()
    user = blockChain.Users[0]
    key = user.get_public_str_full()
    return {"public_key": key[key.find(" ") + 1 :]}


@app.get("/private_key")
def get_private_key():
    if not blockChain:
        initialize_chain()
    user = blockChain.Users[0]
    key = "".join(user.get_private_str_full().splitlines()[4:-1])
    return {"private_key": key[key.find(" ") + 1 :]}


@app.post("/new_transaction")
def create_new_transaction(data: TransactionParams):
    if not blockChain:
        initialize_chain()
    data = data.dict()
    user = blockChain.Users[0]
    t = (
        Transaction(
            data["address"],
            data["send_address"],
            int(data["amount_to_send"]),
            (data["gas"]),
        )
    ).Sign(user.get_private_key())
    blockChain.transactionQueue.append(t)
    # TODO: add checks to make sure that the transaction is actually valid + validate the fields (maybe in the frontend?)


@app.post("/mine_block")
def mine_block(data: None | TransactionToMineParams = None):
    print(data)
    if not data:
        return
    if not blockChain:
        initialize_chain()

    data = data.dict()

    transactions = filter(
        lambda t: t.hash == data["transaction_hash"], blockChain.blockList
    )
    # TODO: fix blockNumber
    print(data)
    block = Block(
        data["blockNumber"],
        "",
        0,
        [transactions],
        data["reward"],
        data["reward_address"],
        blockChain.currBlock.currHash,
    )

    new_block = mine_block_with_feedback(
        block, nonce=data["nonce"], difficulty=blockChain.difficulty
    )
    print(new_block.currHash)
    print(new_block.currHash[: blockChain.difficulty], "0" * blockChain.difficulty)
    print(new_block.currHash[: blockChain.difficulty] == "0" * blockChain.difficulty)

    print(blockChain.submitBlock(new_block))


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1:8000", port=8000)
