import { useState } from "react";
import "./App.css";

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
          className="text-blue-500 block mr-1  text-sm font-medium"
        >
          {label}
        </label>
      </div>
      <input
        type="email"
        id="email"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <div className="flex justify-center align-center">
            <button
              type="submit"
              className="bg-black text-white p-2 rounded-lg"
            >
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
        <td className="border border-slate-600">{sender}</td>
        <td className="border border-slate-600">{receiver}</td>
        <td className="border border-slate-600">{amount}</td>
        <td className="border border-slate-600">{gas}</td>
        <td className="border border-slate-600">{key}</td>
      </tr>
    </tbody>
  );
};

const TransactionTable = () => {
  return (
    <div>
      <Heading title="Transactions" />
      <table className="table-auto bg-blue-100 border-separate border-spacing-2 border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600">Sender</th>
            <th className="border border-slate-600">Receiver</th>
            <th className="border border-slate-600">Amount</th>
            <th className="border border-slate-600">Gas</th>
            <th className="border border-slate-600">Key</th>
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
    <table className="table-auto bg-blue-100 border-separate border-spacing-2 border border-slate-500">
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
          <div className="flex-1">
            <HomePage />
          </div>

          <div className="flex-1">
            <TransactionTable />
          </div>

          <div className="flex-1">
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
          className="text-blue-500 block mr-1  text-sm font-medium"
        >
          {props.label}
        </label>
      </div>
      <input
        type="email"
        id="email"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="addr"
        required
      />
      <button
        className="bg-black text-white"
        onClick={() => handleCopy("emacs")}
      >
        Copy
      </button>
      {props.hasNew && (
        <button onClick={makeNewHash} className="bg-black text-white">
          New
        </button>
      )}
    </div>
  );
};

export default App;
