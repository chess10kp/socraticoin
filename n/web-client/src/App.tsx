import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import "./App.css";

const inputClasses =
  "border cream text-secondary rounded-lg text-sm focus:ring-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500";
const buttonClasses = "bg-primary px-3 text-tan ";
const tableClasses =
  "table-auto mx-auto bg-secondary border-separate border-spacing-2 border border-secondary";
const tableRowCellClasses = "border bg-primary rounded-lg border-slate-600";
const tableRowToggledCellClasses =
  "border bg-[#23e200]  rounded-lg border-slate-600";
const transactionTableHeaderClasses =
  "border table-header text-secondary cream border-secondary rounded-lg";
const minerTableHeaderClasses =
  "border rounded-lg cream text-secondary table-header border-slate-600";

const addressClasses =
  "border-2 border-primary rounded-none cream text-secondary rounded-lg text-sm focus:ring-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500";

function isNumeric(str: any) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const InputForm = ({
  label,
  placeholder,
  updateCallback,
  value,
}: {
  label: string;
  placeholder: string;
  updateCallback: (e: any) => void;
  value: string;
}) => {
  return (
    <div className="mb-5 flex">
      <div className="flex cream items-center">
        <div className="h-full p-2 bg-secondary flex justify-center items-center">
          <label
            htmlFor="email"
            className="text-primary table-header cream p-2 block rounded-lg text-sm font-medium "
          >
            {label}
          </label>
        </div>
      </div>
      <div className="bg-primary p-4">
        <input
          id="email"
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={(e) => updateCallback(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

const Heading = ({ title }: { title: string }) => {
  return (
    <div className="heading align-center cream text-center text-webDarkRed font-bold  text-5xl ">
      <h1 className="text-black-500 py-2">{title}</h1>
    </div>
  );
};

const HomePage = ({ refresh }: { refresh: any }) => {
  const [address, setAddress] = useState("");
  const [send, setSend] = useState("");
  const [amount, setAmount] = useState(100);
  const [sign, setSign] = useState("");
  const [gas, setGas] = useState(10);

  const { sendNotification } = useNotification();

  const handleAddress = (address: string) => setAddress(address);
  const handleSend = (send: string) => setSend(send);
  const handleSendAmount = (amount: number) => setAmount(amount);
  const handleSign = (sign: string) => setSign(sign);
  const handleGas = (gas: number) => setGas(gas);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/private_key")
      .then((response) => response.json())
      .then((data) => {
        setSign(data.private_key);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("http://127.0.0.1:8000/public_key")
      .then((response) => response.json())
      .then((data) => {
        setAddress(data.public_key);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("http://127.0.0.1:8000/rand_user")
      .then((response) => response.json())
      .then((data) => {
        setSend(data.random_user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const validateForm = () => {
    const validations = [
      { condition: !address, message: "Address not valid" },
      { condition: !send, message: "Send address not valid" },
      { condition: !amount, message: "Amount not valid" },
      { condition: !isNumeric(amount), message: "Amount should be number" },
      { condition: amount <= 0, message: "Amount should be positive" },
      { condition: !sign, message: "Sign not valid" },
      { condition: !gas, message: "Gas not valid" },
      { condition: !isNumeric(gas), message: "Gas should be numbers" },
      { condition: gas <= 0, message: "Gas should be positive" },
    ]
    for (const { condition, message } of validations) {
      if (condition) {
      sendNotification("Transaction", message);
      return false;
      }
    }
    return true;  
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    fetch("http://127.0.0.1:8000/new_transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        send_address: send,
        amount_to_send: amount.toString(),
        sign: sign,
        gas: gas.toString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        sendNotification("Transaction", "Transaction was successful");
        refresh();
      });
  };

  return (
    <div>
      <Heading title="User" />
      <div className="">
        <form>
          <div className=" flex flex-col h-full justify-between">
            <InputForm
              value={address}
              updateCallback={handleAddress}
              label="address"
              placeholder="address"
            ></InputForm>
          </div>
          <div className="  flex flex-col h-full justify-between">
            <InputForm
              value={send}
              updateCallback={handleSend}
              label="Send Address"
              placeholder="send address"
            ></InputForm>
            <InputForm
              value={amount.toString()}
              updateCallback={handleSendAmount}
              label="Amount"
              placeholder="$10"
            ></InputForm>
            <InputForm
              value={sign}
              updateCallback={handleSign}
              label="Sign"
              placeholder="private key"
            ></InputForm>
            <InputForm
              value={gas.toString()}
              updateCallback={handleGas}
              label="Gas"
              placeholder="Gas"
            />
          </div>
          <div className="flex justify-left align-center">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className={buttonClasses}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

type TransactionTableRowProps = {
  sender: string;
  receiver: string;
  amount: string;
  gas: string;
  sign: string;
  moveToMinerTransaction: (transaction: Transaction) => void;
};

const TransactionTableRow = ({
  sender,
  receiver,
  amount,
  gas,
  sign,
  moveToMinerTransaction,
}: TransactionTableRowProps) => {
  const rowData = [
    sender ? sender.slice(sender.length - 6, sender.length) : "",
    receiver ? receiver.slice(receiver.length - 6, receiver.length) : "",
    amount,
    gas,
    sign ? sign.slice(sign.length - 4, sign.length) : "",
  ];
  return (
    <tbody>
      <tr
        onClick={() =>
          moveToMinerTransaction({
            sender: sender,
            receiver: receiver,
            amount: amount,
            gasFee: gas,
            signature: sign,
          })
        }
      >
        {rowData.map((data, i) => (
          <td key={i} className={tableRowCellClasses}>
            {data}
          </td>
        ))}
      </tr>
    </tbody>
  );
};

type TransactionTableProps = {
  transactions: string[][];
  moveToMinerTransactionCallback: (transaction: Transaction) => void;
};

const TransactionTable = ({
  transactions,
  moveToMinerTransactionCallback,
}: TransactionTableProps) => {
  const headings = ["Sender", "Receiver", "Amount", "Gas", "Key"];
  return (
    <div>
      <Heading title="Transactions" />
      {transactions != null &&
      transactions.length > 0 &&
      transactions[0].length > 1 ? (
        <table className={tableClasses}>
          <thead>
            <tr>
              {headings.map((header, i) => (
                <th key={i} className={transactionTableHeaderClasses}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {transactions.map((transaction, i) => {
            if (transactions === null) return <></>;
            if (transaction.length < 5) return <></>;
            return (
              <TransactionTableRow
                key={i}
                sender={transaction[0]}
                receiver={transaction[1]}
                amount={transaction[2]}
                gas={transaction[4]}
                sign={transaction[3]}
                moveToMinerTransaction={moveToMinerTransactionCallback}
              />
            );
          })}
        </table>
      ) : (
        <p> No transactions made yet </p>
      )}
    </div>
  );
};

type MinerTableProps = {
  minerTransactions: Transaction[];
  moveToBlockChainCallback: (tl: Array<string>) => void;
};

const MinerTable = ({
  minerTransactions,
  moveToBlockChainCallback: moveToBlockchainCallback,
}: MinerTableProps) => {
  const [toggledTransactions, setToggledTransactions] = useState<number[]>([]);

  const getToggledTransactions = () => {
    return toggledTransactions.map((i) => minerTransactions[i].signature);
  };

  const toggleTransaction = (i: number) => {
    if (toggledTransactions.includes(i)) {
      setToggledTransactions(
        toggledTransactions.filter((transaction) => transaction != i),
      );
    } else {
      setToggledTransactions([...toggledTransactions, i]);
    }
  };

  return (
    <>
      <div className="flex justify-evenly items-center my-2">
        <button className={buttonClasses}>Hash</button>
        <button
          onClick={() => moveToBlockchainCallback(getToggledTransactions())}
          className={buttonClasses}
        >
          Auto
        </button>
      </div>
      {minerTransactions.length > 0 && (
        <table className={tableClasses}>
          <thead>
            <tr>
              {["Sender", "Receiver", "Amount", "Gas", "Key", "Send"].map(
                (header, i) => (
                  <th key={i} className={minerTableHeaderClasses}>
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {minerTransactions.map((transaction, i) => {
              const rowData = [
                transaction.sender
                  ? transaction.sender.slice(
                      transaction.sender.length - 6,
                      transaction.sender.length,
                    )
                  : "",
                transaction.receiver
                  ? transaction.receiver.slice(
                      transaction.receiver.length - 6,
                      transaction.receiver.length,
                    )
                  : "",
                transaction.amount,
                transaction.gasFee,
                transaction.signature
                  ? transaction.signature.slice(
                      transaction.signature.length - 4,
                      transaction.signature.length,
                    )
                  : "",
              ];
              const rowCellClass = toggledTransactions.includes(i)
                ? tableRowToggledCellClasses
                : tableRowCellClasses;
              const rowClass = toggledTransactions.includes(i)
                ? "-translate-x-2"
                : "";
              return (
                <tr key={i} className={rowClass} onClick={() => toggleTransaction(i)}>
                  <td className={rowCellClass}>{rowData[0]}</td>
                  <td className={rowCellClass}>{rowData[1]}</td>
                  <td className={rowCellClass}>{rowData[2]}</td>
                  <td className={rowCellClass}>{rowData[3]}</td>
                  <td className={rowCellClass}>{rowData[4]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

type MinerPageProps = {
  minedTransactions: Transaction[];
  mineTransactionCallback: (transaction: TransactionsToMine) => void;
  getBlockNumberCallback: () => string;
};

const MinerPage = ({
  minedTransactions,
  mineTransactionCallback,
  getBlockNumberCallback,
}: MinerPageProps) => {
  const [hash, setHash] = useState("");
  const [nonce, setNonce] = useState("");
  const [prev, setPrev] = useState("");
  const [reward, setReward] = useState(100);
  const [rewardAddress, setRewardAddress] = useState("");

  const {sendNotification} = useNotification();

  const handleHash = (hash: string) => setHash(hash);
  const handleNonce = (nonce: string) => setNonce(nonce);
  const handlePrev = (prev: string) => setPrev(prev);
  const handleReward = (reward: number) => setReward(reward);
  const handleRewardAddress = (rewardAddress: string) =>
    setRewardAddress(rewardAddress);

const validateForm = () => {
  const validations = [
    { condition: !hash, message: "Hash not valid" },
    { condition: !nonce, message: "Nonce not valid" },
    { condition: !prev, message: "Prev not valid" },
    { condition: !reward, message: "Reward not valid" },
    { condition: reward && !isNumeric(reward), message: "Reward should be number" },
    { condition: reward && reward <= 0, message: "Reward should be positive" },
    { condition: !rewardAddress, message: "Reward Address not valid" },
  ];

  for (const { condition, message } of validations) {
    if (condition) {
      sendNotification("MinerForm", message);
      return false;
    }
  }
  
  return true;
};
  const mineTransaction = (t: Array<string>) => {
    if (!validateForm()) return;
    const transactionsToMine: TransactionsToMine = {
      reward: reward.toString(),
      nonce: nonce,
      signatures: t,
      reward_address: rewardAddress,
      blockNumber: getBlockNumberCallback(),
    };
    mineTransactionCallback(transactionsToMine);
  };

  return (
    <div className="">
      <Heading title="Miner" />
      <div className=" flex flex-col h-full justify-between">
        <InputForm
          value={hash}
          updateCallback={handleHash}
          label="Hash"
          placeholder="transaction signature"
        />
        <InputForm
          value={nonce}
          updateCallback={handleNonce}
          label="Nonce"
          placeholder="random string"
        />
        <InputForm
          value={prev}
          updateCallback={handlePrev}
          label="Prev"
          placeholder="previous block hash"
        />
        <InputForm
          value={reward.toString()}
          updateCallback={handleReward}
          label="Reward"
          placeholder="reward (ex $10)"
        />
        <InputForm
          value={rewardAddress}
          updateCallback={handleRewardAddress}
          label="Reward Address"
          placeholder="address to send reward to"
        />

        <MinerTable
          moveToBlockChainCallback={mineTransaction}
          minerTransactions={minedTransactions}
        />
      </div>
    </div>
  );
};

type BlockProps = {
  currentHashBlock: BlockInfo;
};

const Block = ({ currentHashBlock }: BlockProps) => {
  return (
    <div className="flex flex-col border-2 border-secondary  my-2 block-shadow ">
      <div className="flex bg-secondary m-0 px-4 z-1 ">
        <p>
          {currentHashBlock.prevHash.length > 6
            ? currentHashBlock.prevHash.slice(
                currentHashBlock.prevHash.length - 6,
                currentHashBlock.prevHash.length,
              )
            : currentHashBlock.prevHash}
        </p>
      </div>
      <div className="m-auto p-2">
        <p>id {currentHashBlock.id}</p>
        <p>nonce {currentHashBlock.nonce}</p>
      </div>
      <div className="bg-secondary m-0 px-4">
        <p>
          {currentHashBlock.hash.length > 6
            ? currentHashBlock.hash.slice(
                currentHashBlock.hash.length - 6,
                currentHashBlock.hash.length,
              )
            : currentHashBlock.hash}
        </p>
      </div>
    </div>
  );
};

const BlockArrow = () => {
  return (
    <div className="m-0 flex items-center p-0 z-0">
      <svg
        width="50"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="400 250 250 200"
      >
        <g
          strokeWidth="10"
          stroke="hsl(0, 0%, 0%)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(288, 400, 400)"
        >
          <path
            d="M250 250Q450 470 550 550 "
            markerEnd="url(#SvgjsMarker1119)"
          ></path>
        </g>
        <defs>
          <marker
            markerWidth="5"
            markerHeight="5"
            refX="2.5"
            refY="2.5"
            viewBox="0 0 5 5"
            orient="auto"
            id="SvgjsMarker1119"
          >
            <polygon
              points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
              fill="hsl(0, 0%, 0%)"
            ></polygon>
          </marker>
        </defs>
      </svg>
    </div>
  );
};

type BlockInfo = {
  id: string;
  blockNumber: string;
  hash: string;
  nonce: string;
  blockReward: string;
  prevHash: string;
  transaction: Transaction[];
};

type Transaction = {
  sender: string;
  receiver: string;
  amount: string;
  signature: string;
  gasFee: string;
};

type TransactionsToMine = {
  signatures: string[];
  reward_address: string;
  reward: string;
  nonce: string;
  blockNumber: string;
};

type BlocksProps = {
  blocks: BlockInfo[];
};

const Blocks = ({ blocks }: BlocksProps) => {
  const lastBlock: BlockInfo = {
    id: "???",
    blockNumber: "???",
    hash: "???",
    nonce: "???",
    blockReward: "???",
    prevHash: "???",
    transaction: [],
  };

  return (
    <div className="flex items-center overflow-x-scroll justify-center px-8 ">
      {blocks &&
        blocks.map((block, index) => {
          return (
            <div className="flex" key={index}>
              <Block currentHashBlock={block} />
              <BlockArrow />
            </div>
          );
        })}
      <Block currentHashBlock={lastBlock} />
    </div>
  );
};

type NotifProps = {
  heading: string;
  message: string;
  visible: boolean;
};

const Notif = ({ heading, message, visible }: NotifProps) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (visible) {
      setAnimate(true);

      // Set a timeout to hide the notification after a specified time
      setTimeout(() => {
        setAnimate(false);
      }, 5000);
    }
  }, [visible]);
  return (
    <>
      <div
        className={`bg-orange-100 fixed left-0 top-0 z-50 border-l-4 border-orange-500 text-orange-700 p-4 ${animate ? "slide-in" : ""}`}
        role="alert"
      >
        <p className="font-bold">{heading}</p>
        <p>{message}</p>
      </div>
    </>
  );
};

interface NotificationContextType {
  sendNotification: (heading: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notif, setNotif] = useState({
    heading: "",
    message: "",
    visible: true,
  });

  const sendNotification = (heading: string, message: string) => {
    console.log("hi");
    setNotif({ heading, message, visible: true });

    setTimeout(() => {
      setNotif((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ sendNotification }}>
      {notif.visible && (
        <Notif
          heading={notif.heading}
          message={notif.message}
          visible={notif.visible}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState<Array<BlockInfo>>([]);
  const [minerTransactions, setMinedTransactions] = useState<
    Array<Transaction>
  >([]);

  const c = useContext(NotificationContext);

  const moveToMinerTransaction = (transaction: Transaction) => {
    const tl = transactions.filter((t) => t[3] != transaction.signature);
    setTransactions(tl);
    setMinedTransactions([...minerTransactions, transaction]);
  };

  /*
   * Add a tranasction to the blockchain
   */
  const mineTransaction = (t: TransactionsToMine) => {
    // TODO: remove t from the minertable, then call "/mine_block"
    // TODO: also fix bug with the transactions list not being sent into the external api

    const minerTs = minerTransactions.filter((minerTransaction) =>
      t.signatures.includes(minerTransaction.signature),
    );
    setMinedTransactions(minerTs);
    console.log({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        transaction_hashes: t.signatures,
        nonce: t.nonce,
        blockNumber: (blocks.length + 1).toString(),
        reward: t.reward,
        reward_address: t.reward_address,
      },
    });
    fetch("http://127.0.0.1:8000/mine_block", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_hashes: t.signatures,
        nonce: t.nonce,
        blockNumber: blocks.length.toString(),
        reward: t.reward,
        reward_address: t.reward_address,
      }),
    });
    refreshTransactions();
    refreshBlockChain();
  };

  const refreshBlockChain = () => {
    fetch("http://127.0.0.1:8000/blockchain")
      .then((response) => {
        return response.json();
      })
      .then((data: { number: BlockInfo }) => {
        const blocks = Array<BlockInfo>();
        for (const [_, value] of Object.entries(data)) {
          blocks.push(value);
        }
        setBlocks(blocks);
      });
  };

  const getBlockNumber = () => {
    return blocks.length.toString();
  };

  const refreshTransactions = () => {
    fetch("http://127.0.0.1:8000/transactions")
      .then((response) => response.json())
      .then((data) => {
        const fetchedTransactions = data.transactions;
        if (fetchedTransactions.length == transactions.length + 1) {
          // when a new transactions has been added, do not refresh the whole list
          // this is because some of the transactiosn may be in the minerpage, still pending to be mined
          // so we only add the new transaction to the list
          let transactionToAdd = [];
          if (transactions.length == 0) {
            transactionToAdd = fetchedTransactions[0];
          } else {
            let p1 = 0;
            let p2 = 0;
            while (p1 < fetchedTransactions.length) {
              if (fetchedTransactions[p1][3] != transactions[p2][3]) {
                transactionToAdd = fetchedTransactions[p1];
                break;
              }
              p1++;
              if (p2 < transactions.length - 1) p2++;
            }
          }
          if (transactionToAdd !== null)
            setTransactions([...transactions, transactionToAdd]);
        } else if (fetchedTransactions.length == transactions.length) {
          // page refreshed due to various update calls, but nothing added
          return;
        } else {
          // fresh call
          setTransactions(fetchedTransactions);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/blockchain")
      .then((response) => {
        return response.json();
      })
      .then((data: { number: BlockInfo }) => {
        const blocks = Array<BlockInfo>();
        for (const [_, value] of Object.entries(data)) {
          blocks.push(value);
        }
        setBlocks(blocks);
      });
  }, []);

  return (
    <NotificationProvider>
      <div className="relative">
        <Blocks blocks={blocks} />
        <main className="flex flex-col">
          <div className="flex">
            <div className="flex-1 menu-shadow p-2 border-2 border-secondary">
              <HomePage refresh={refreshTransactions} />
            </div>
            <div className="flex-1 menu-shadow p-2 border-2 border-secondary ">
              <TransactionTable
                moveToMinerTransactionCallback={moveToMinerTransaction}
                transactions={transactions}
              />
            </div>
            <div className="flex-1 menu-shadow p-2 border-2 border-secondary">
              <MinerPage
                getBlockNumberCallback={getBlockNumber}
                minedTransactions={minerTransactions}
                mineTransactionCallback={mineTransaction}
              />
            </div>
          </div>
          <div className="">
            <Addresses />
          </div>
        </main>
      </div>
    </NotificationProvider>
  );
};

type AddressProps = {
  userAddress: string;
  hasNew: boolean;
  label: string;
};

const Addresses = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [addressB, setAddressB] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/private_key")
      .then((response) => response.json())
      .then((data) => {
        setPrivateKey(data.private_key);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("http://127.0.0.1:8000/public_key")
      .then((response) => response.json())
      .then((data) => {
        setPublicKey(data.public_key);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("http://127.0.0.1:8000/rand_user")
      .then((response) => response.json())
      .then((data) => {
        setAddressB(data.random_user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="my-5">
      <Address label="Addr A" userAddress={publicKey} hasNew={true} />
      <Address label="Private Key A" userAddress={privateKey} hasNew={false} />
      <Address label="Addr B" userAddress={addressB} hasNew={false} />
    </div>
  );
};

const Address = (props: AddressProps) => {
  const [_, setCopy] = useState(false);
  const makeNewHash = () => {
    // TODO:
  };
  const handleCopy = (text: string) => {
    const textToCopy = text;
    // Copy the text to the clipboard
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div className="flex px-2">
      <div className="flex items-center">
        <label
          htmlFor="email"
          className="bg-primary block p-1 table-header text-secondary text-sm font-medium"
        >
          {props.label}
        </label>
      </div>
      <div className={addressClasses}>
        {props.userAddress.slice(0, 80) + "..."}
      </div>
      <button
        className={buttonClasses}
        onClick={() => handleCopy(props.userAddress)}
      >
        Copy
      </button>
      {props.hasNew && (
        <button onClick={makeNewHash} className={buttonClasses}>
          New
        </button>
      )}
    </div>
  );
};

export default App;
