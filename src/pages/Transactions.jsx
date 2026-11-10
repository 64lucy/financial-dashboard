
import "./Transactions.css";
import {useState} from "react";
function Transactions({
    transactions,
    deleteTransaction,
    editTransaction,
    setShowModal
}) {
    const [searchTerm, setSearchTerm] = useState("");
    return(
         <div className="transactions-page">
        <header className="page-header">
            <h1>Transactions</h1>
            <button onClick={() => setShowModal(true)}>
                   + Add Transaction
                    </button>
            <p>Track,add,edit and manage your income and expenses</p>
            <p>Number of transactions:{transactions.length}</p>
        </header>
     <div className="transactions-list">
        {transactions.map((transaction) => (
          <div className="transaction-card" key={transaction._id}>
            <h3>{transaction.description}</h3>
            <p>{transaction.category}</p>
            <p>{transaction.date}</p>
            <p>{transaction.type}</p>
           
            <h3>
              Ksh {Number(transaction.amount).toLocaleString()}
            </h3>
             
             <button onClick={() => editTransaction(transaction)}>
                   Edit
                    </button>
            <button onClick={() => deleteTransaction(transaction._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Transactions;