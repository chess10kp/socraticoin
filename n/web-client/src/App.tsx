import { useState } from "react";
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
            className="text-primary cream p-2 block rounded-lg text-sm font-medium "
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
      <h1 className="text-black-500">{title}</h1>
    </div>
  );
};

const HomePage = () => {
  const [address, setAddress] = useState("");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [send, setSend] = useState("");
  const [amount, setAmount] = useState(0);
  const [sign, setSign] = useState("");
  const [gas, setGas] = useState(0);

  const handleAddress = (address: string) => setAddress(address);
  const handleAmount = (amount: number) => setCurrentAmount(amount);
  const handleSend = (send: string) => setSend(send);
  const handleSendAmount = (amount: number) => setAmount(amount);
  const handleSign = (sign: string) => setSign(sign);
  const handleGas = (gas: number) => setGas(gas);

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
            <InputForm
              value={currentAmount.toString()}
              updateCallback={handleAmount}
              label="Current Amount"
              placeholder="$10"
            ></InputForm>
          </div>
          <div className=" bg-red-100 flex flex-col h-full justify-between">
            <InputForm
              value={send}
              updateCallback={handleSend}
              label="Send"
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
            <button type="submit" className={buttonClasses}>
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
  key: string;
};

const TransactionTableRow = ({
  sender,
  receiver,
  amount,
  gas,
  key,
}: TransactionTableRowProps) => {
  return (
    <tbody>
      <tr>
        <td className={tableRowClasses}>{sender}</td>
        <td className={tableRowClasses}>{receiver}</td>
        <td className={tableRowClasses}>{amount}</td>
        <td className={tableRowClasses}>{gas}</td>
        <td className={tableRowClasses}>{key}</td>
      </tr>
    </tbody>
  );
};

const TransactionTable = () => {
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
        <TransactionTableRow
          sender="sender"
          receiver="rec"
          amount="10"
          gas="1"
          key="10"
        />
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

        <MinerTable />
      </div>
    </div>
  );
};

const Block = () => {
  return (
    <div className="flex flex-col border-2 border-secondary  my-2">
      <div className="bg-secondary m-0 px-4">
        <p>Prev hash</p>
      </div>
      <div className="m-auto">
        <p>Prev hash</p>
      </div>
      <div className="bg-secondary m-0 px-4">
        <p>Prev hash</p>
      </div>
    </div>
  );
};

const Blocks = () => {
  return (
    <div className="flex justify-evenly px-8 ">
      <Block />
      <Block />
      <Block />
    </div>
  );
};

function App() {
  return (
    <>
      <Blocks />
      <main className="bg-red-100 flex flex-col">
        <div className="flex">
          <div className="flex-1 menu-shadow p-2 border-2 border-secondary">
            <HomePage />
          </div>
          <div className="flex-1 menu-shadow p-2 border-2 border-secondary ">
            <TransactionTable />
          </div>
          <div className="flex-1 menu-shadow p-2 border-2 border-secondary">
            <MinerPage />
          </div>
        </div>
        <div className="">
          <Addresses label="Addr A" userAddress="TODO:" hasNew={true} />
          <Addresses label="Private Key A" userAddress="TODO:" hasNew={false} />
          <Addresses label="Addr B" userAddress="TODO:" hasNew={false} />
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

const Addresses = (props: AddressProps) => {
  console.log(props);
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
      <div className={addressClasses}>#woeijfowiej</div>
      <button className={buttonClasses} onClick={() => handleCopy("emacs")}>
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
