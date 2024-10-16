import { useState, useEffect } from "react";
import "./App.css";

const inputClasses =
  "border cream text-secondary rounded-lg text-sm focus:ring-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500";
const buttonClasses = "bg-primary px-3 text-secondary";
const tableRowClasses = "border bg-primary rounded-lg border-slate-600";
const addressClasses =
  "border-2 border-primary rounded-none cream text-secondary rounded-lg text-sm focus:ring-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500";

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
  const [amount, setAmount] = useState(0);
  const [sign, setSign] = useState("");
  const [gas, setGas] = useState(0);

  const handleAddress = (address: string) => setAddress(address);
  const handleSend = (send: string) => setSend(send);
  const handleSendAmount = (amount: number) => setAmount(amount);
  const handleSign = (sign: string) => setSign(sign);
  const handleGas = (gas: number) => setGas(gas);

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
        refresh();
      });
  };

  return (
    <div>
      <Heading title="User" />
      <div className="bg-white">
        <form>
          <div className=" bg-red-100 flex flex-col h-full justify-between">
            <InputForm
              value={address}
              updateCallback={handleAddress}
              label="address"
              placeholder="address"
            ></InputForm>
          </div>
          <div className=" bg-red-100 flex flex-col h-full justify-between">
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
          <div className="flex justify-center align-center bg-primary">
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
};

const TransactionTableRow = ({
  sender,
  receiver,
  amount,
  gas,
  sign,
}: TransactionTableRowProps) => {
  return (
    <tbody>
      <tr>
        <td className={tableRowClasses}>{sender}</td>
        <td className={tableRowClasses}>{receiver}</td>
        <td className={tableRowClasses}>{amount}</td>
        <td className={tableRowClasses}>{gas}</td>
        <td className={tableRowClasses}>{sign}</td>
      </tr>
    </tbody>
  );
};

const TransactionTable = ({ transactions }: { transactions: string[][] }) => {
  return (
    <div>
      <Heading title="Transactions" />
      <table className="table-auto mx-auto bg-secondary border-separate border-spacing-2 border border-secondary">
        <thead>
          <tr>
            <th className="border table-header text-secondary cream border-secondary rounded-lg">
              Sender
            </th>
            <th className="border table-header text-secondary cream border-secondary rounded-lg">
              Receiver
            </th>
            <th className="border table-header text-secondary cream border-secondary rounded-lg">
              Amount
            </th>
            <th className="border table-header text-secondary cream border-secondary rounded-lg">
              Gas
            </th>
            <th className="border table-header text-secondary cream border-secondary rounded-lg">
              Key
            </th>
          </tr>
        </thead>
        {Object.entries(transactions).map(([i, transaction]) => (
          <TransactionTableRow
            key={i}
            sender={transaction[0]}
            receiver={transaction[1]}
            amount={transaction[2]}
            gas={transaction[3]}
            sign={transaction[4]}
          />
        ))}
      </table>
    </div>
  );
};

const MinerTable = () => {
  return (
    <table className="table-auto bg-secondary border-separate border-spacing-2 border border-secondary">
      <thead>
        <tr>
          <th className="border rounded-lg cream text-secondary table-header border-slate-600">
            Sender
          </th>
          <th className="border rounded-lg cream text-secondary table-header border-slate-600">
            Receiver
          </th>
          <th className="border rounded-lg cream text-secondary table-header border-slate-600">
            Amount
          </th>
          <th className="border rounded-lg cream text-secondary table-header border-slate-600">
            Gas
          </th>
          <th className="border rounded-lg cream text-secondary table-header border-slate-600">
            Key
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={tableRowClasses}>Shining Star</td>
          <td className={tableRowClasses}>Earth, Wind, and Fire</td>
          <td className={tableRowClasses}>1975</td>
          <td className={tableRowClasses}>1975</td>
          <td className={tableRowClasses}>1975</td>
        </tr>
      </tbody>
    </table>
  );
};

const MinerPage = () => {
  const [hash, setHash] = useState("");
  const [nonce, setNonce] = useState("");
  const [prev, setPrev] = useState("");
  const [number, setNumber] = useState(0);
  const [reward, setReward] = useState(0);
  const [rewardAddress, setRewardAddress] = useState("");

  const handleHash = (hash: string) => setHash(hash);
  const handleNonce = (nonce: string) => setNonce(nonce);
  const handlePrev = (prev: string) => setPrev(prev);
  const handleNumber = (number: number) => setNumber(number);
  const handleReward = (reward: number) => setReward(reward);
  const handleRewardAddress = (rewardAddress: string) =>
    setRewardAddress(rewardAddress);

  return (
    <div className="">
      <Heading title="Miner" />
      <div className=" bg-red-100 flex flex-col h-full justify-between">
        <InputForm
          value={hash}
          updateCallback={handleHash}
          label="Hash"
          placeholder="address"
        ></InputForm>
        <InputForm
          value={nonce}
          updateCallback={handleNonce}
          label="Nonce"
          placeholder="$10"
        ></InputForm>
        <InputForm
          value={prev}
          updateCallback={handlePrev}
          label="Prev"
          placeholder="$10"
        ></InputForm>
        <InputForm
          value={number.toString()}
          updateCallback={handleNumber}
          label="Number"
          placeholder="number"
        />
        <InputForm
          value={reward.toString()}
          updateCallback={handleReward}
          label="Reward"
          placeholder="reward"
        />
        <InputForm
          value={rewardAddress}
          updateCallback={handleRewardAddress}
          label="Reward Address"
          placeholder="reward address"
        />
        <div className="flex justify-evenly items-center my-2">
          <button className={buttonClasses}>Hash</button>
          <button className={buttonClasses}>Auto</button>
        </div>

        <MinerTable />
      </div>
    </div>
  );
};

type BlockProps = {
  currentHashBlock: BlockInfo;
};

const Block = ({ currentHashBlock }: BlockProps) => {
  console.log(currentHashBlock);
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
        <p>id {currentHashBlock.blockNumber}</p>
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
  blockNumber: string;
  hash: string;
  nonce: string;
  blockReward: string;
  prevHash: string;
  transaction: TransactionInfo[];
};

type TransactionInfo = {
  sender: string;
  reciever: string;
  amount: string;
  signature: string;
  gasFee: string;
};

const Blocks = () => {
  const [blocks, setBlocks] = useState<Array<BlockInfo>>([]);
  const [currentHashBlock, setcurrentHashBlock] = useState<Array<BlockInfo>>(
    [],
  );

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

  const lastBlock: BlockInfo = {
    blockNumber: "",
    hash: "",
    nonce: "",
    blockReward: "",
    prevHash: "",
    transaction: [],
  };

  return (
    <div className="flex items-center overflow-scroll justify-center px-8 ">
      {blocks &&
        blocks.map((block, index) => {
          return (
            <div key={index}>
              <Block currentHashBlock={block} />
              <BlockArrow />
            </div>
          );
        })}
      <Block currentHashBlock={lastBlock} />
    </div>
  );
};

function App() {
  const [transactions, setTransactions] = useState([[""]]);

  const refreshTransactions = () => {
    fetch("http://127.0.0.1:8000/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  return (
    <>
      <Blocks />
      <main className="bg-red-100 flex flex-col">
        <div className="flex">
          <div className="flex-1 menu-shadow p-2 border-2 border-secondary">
            <HomePage refresh={refreshTransactions} />
          </div>
          <div className="flex-1 menu-shadow p-2 border-2 border-secondary ">
            <TransactionTable transactions={transactions} />
          </div>
          <div className="flex-1 menu-shadow p-2 border-2 border-secondary">
            <MinerPage />
          </div>
        </div>
        <div className="">
          <Addresses />
        </div>
      </main>
    </>
  );
}

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
