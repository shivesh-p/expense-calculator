import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  function currencyFormat(num) {
    num = parseFloat(num);
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  useEffect(() => {
    handleCalculation();
  }, [items]);
  const handleCalculation = () => {
    let amount = 0;
    items.forEach((item) => {
      if (item.type == "income") amount += parseFloat(item.amount);
      else amount -= parseFloat(item.amount);
    });

    setTotal((e) => (e = amount));
  };
  const handleAddItems = () => {
    const updatedItems = [...items];
    if (amount && desc) {
      updatedItems.push({
        type,
        desc,
        amount,
        date: new Date().toDateString(),
      });
      setItems(() => {
        return [...updatedItems];
      });
      setDesc((e) => (e = ""));
      setAmount((e) => (e = 0));
    }
  };
  return (
    <main>
      <div>
        <h1
          className={`total-text ${
            total != 0 ? (total > 0 ? "success" : "danger") : ""
          }`}
        >
          {total != 0 ? (total > 0 ? "+" : "-") : ""}
          {currencyFormat(Math.abs(total))}
        </h1>
        <div className="input-container">
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            placeholder="Description"
          />
          <input
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
          <select onChange={(e) => setType(e.target.value)} value={type}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button onClick={handleAddItems}>+</button>
        </div>
        <div>
          {items.map((item, index) => (
            <div key={index} className="card">
              <div className="card-info">
                <h4>{item.desc}</h4>
                <p>{item.date}</p>
              </div>
              {item.type == "income" && (
                <p className="amount-text success">
                  +{currencyFormat(item.amount)}
                </p>
              )}
              {item.type == "expense" && (
                <p className="amount-text danger">
                  -{currencyFormat(item.amount)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
