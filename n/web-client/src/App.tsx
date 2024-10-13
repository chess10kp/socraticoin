import { useState } from "react";
import "./App.css";

const inputClasses =
  "border bg-primary border-webBlue text-secondary text-sm focus:ring-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500";
const buttonClasses = "bg-webBlue px-3 text-white";

const InputForm = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => {
  return (
    <div className="mb-5 flex">
      <div className="flex  items-center">
        <label
          htmlFor="email"
          className="text-blue-500 bg-secondary h-full block pr-1  text-sm font-medium "
        >
          {label}
        </label>
      </div>
      <input
        type="email"
        id="email"
        className={inputClasses}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

const Heading = ({ title }: { title: string }) => {
  return (
    <div className="align-center bg-red-100 text-center text-webDarkRed font-bold  text-3xl ">
      <h1 className="text-black-500">{title}</h1>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <Heading title="User" />
      <div className="bg-white">
        <form>
          <div className=" bg-red-100 flex flex-col h-full justify-between">
            <InputForm label="address" placeholder="address"></InputForm>
            <InputForm label="Amount" placeholder="$10"></InputForm>
          </div>
          <div className=" bg-red-100 flex flex-col h-full justify-between">
            <InputForm label="Send" placeholder="send address"></InputForm>
            <InputForm label="Amount" placeholder="$10"></InputForm>
            <InputForm label="Sign" placeholder="private key"></InputForm>
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

const TransactionTableRow = ({ sender, receiver, amount, gas, key }) => {
  return (
    <tbody>
      <tr>
        <td className="border border-secondary">{sender}</td>
        <td className="border border-secondary">{receiver}</td>
        <td className="border border-secondary">{amount}</td>
        <td className="border border-secondary">{gas}</td>
        <td className="border border-secondary">{key}</td>
      </tr>
    </tbody>
  );
};

const TransactionTable = () => {
  return (
    <div>
      <Heading title="Transactions" />
      <table className="table-auto bg-secondary border-separate border-spacing-2 border border-secondary">
        <thead>
          <tr>
            <th className="border border-secondary">Sender</th>
            <th className="border border-secondary">Receiver</th>
            <th className="border border-secondary">Amount</th>
            <th className="border border-secondary">Gas</th>
            <th className="border border-secondary">Key</th>
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
          <th className="border border-slate-600">Sender</th>
          <th className="border border-slate-600">Receiver</th>
          <th className="border border-slate-600">Amount</th>
          <th className="border border-slate-600">Gas</th>
          <th className="border border-slate-600">Key</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-slate-600">Shining Star</td>
          <td className="border border-slate-600">Earth, Wind, and Fire</td>
          <td className="border border-slate-600">1975</td>
          <td className="border border-slate-600">1975</td>
          <td className="border border-slate-600">1975</td>
        </tr>
      </tbody>
    </table>
  );
};

const MinerPage = () => {
  return (
    <div className="">
      <Heading title="Miner" />
      <div className=" bg-red-100 flex flex-col h-full justify-between">
        <InputForm label="Hash" placeholder="address"></InputForm>
        <InputForm label="Nonce" placeholder="$10"></InputForm>
        <InputForm label="Prev" placeholder="$10"></InputForm>
        <MinerTable />
      </div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="bg-red-100 flex flex-col">
        <div className="flex">
          <div className="flex-1 p-2 ">
            <HomePage />
          </div>

          <div className="flex-1 p-2">
            <TransactionTable />
          </div>

          <div className="flex-1 p-2">
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
          className="bg-blue-500 block pr-1  text-sm font-medium"
        >
          {props.label}
        </label>
      </div>
      <input
        type="email"
        id="email"
        className={inputClasses}
        placeholder="addr"
        required
      />
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
