
import "./Accounts.css";
import {useState, useEffect} from "react";
import {Wallet,Plus,Trash2} from "lucide-react";

function Accounts(){
  const[accounts,setAccounts] =useState(()=>{
    const savedAccounts =localStorage.getItem("accounts");

    return savedAccounts ? JSON.parse(savedAccounts):[
    {id:1, name:"Main Bank Account", type:"Bank", balance:25000},
    {id:2, name:"Savings Account", type:"Savings", balance:15000},
    {id:3, name:"Cash Wallet", type:"Cash", balance:5000},
  ];
});
 useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);


  const[showForm,setShowForm]=useState(false);
  const[accountName,setAccountName]=useState("");
  const[accountType,setAccountType]=useState("Bank");
  const[accountBalance,setAccountBalance]=useState("");
  const [editingId,setEditingId]=useState(null);
  
   const totalBalance= accounts.reduce(
    (total,account)=>total+ Number(account.balance || 0),0
   );
  
   const editAccount = (account) => {
  setEditingId(account.id);
  setAccountName(account.name);
  setAccountType(account.type);
  setAccountBalance(String(account.balance));
  setShowForm(true);
};

const addAccount = () => {
  if (!accountName.trim()) {
    alert("Please enter an account name");
    return;
  }

  if (accountBalance.trim() === "" || 
  Number(accountBalance) < 0 ||
   !Number.isFinite(Number(accountBalance))) {
    alert("Please enter a valid opening balance");
    return;  
}

  if (editingId !== null) {
    setAccounts(previousAccounts =>
      previousAccounts.map(account =>
        account.id === editingId
          ? {
              ...account,
              name: accountName,
              type: accountType,
              balance: Number(accountBalance)
            }
          : account
      )
    );
  } else {
    const newAccount = {
      id: Date.now(),
      name: accountName,
      type: accountType,
      balance: Number(accountBalance)
    };

    setAccounts(previousAccounts => [
      ...previousAccounts,
      newAccount
    ]);
    }
  setAccountName("");
  setAccountType("Bank");
  setAccountBalance("");
  setShowForm(false);
  setEditingId(null);
};
  

    return(
        <div className= "accounts-page">
        <header className="page-header">
            <h1>Accounts</h1>
            <p>Manage your bank accounts,cash balances and account details.</p>
            </header>
        <div className="account-summary">
            <Wallet size={28}/>
        <div>
            <p>Total Account Balance</p>
            <h2>ksh{totalBalance.toLocaleString()}</h2>
            </div>
            </div>

            {showForm &&(
  
                <div className="account-form">
                    <h3>{editingId !==null? "Edit Account":"Add New Account"}</h3>
                    <input
                    type="text"
                    placeholder="Account name"
                    value={accountName}
                    onChange={(e)=> setAccountName(e.target.value)} />

                    <select
                    value={accountType}
                    onChange={(e)=>setAccountType(e.target.value)}
                    >
                        <option value="Bank">Bank</option>
                         <option value="Savings">Savings</option>
                          <option value="Cash">Cash</option>
                          </select>

                          <input
                          type="number"
                          placeholder="Opening balance"
                          value={accountBalance}
                          onChange={(e)=>setAccountBalance(e.target.value)}
                          />
                          </div>
                          
                          
               )}
             
                           <div className="account-form-actions">
                      <button onClick={addAccount}>
                 Save Account
                   </button>

                <button onClick={() => setShowForm(false)}>
                      Cancel
                     </button>
                     </div>

            <section className="accounts-section">
                <div className="accounts-heading">
                <h2>My Accounts</h2>
                <button onClick={()=> setShowForm(!showForm)}>
                    <Plus size={18}/>
                    Add Account
                </button>
                </div>
                <div className="accounts-grid">
                    {accounts.map((account)=>{
                        <button onClick={() => editAccount(account)}>
                          Edit
                           </button>
  
                         return(
                        <div className="account-card" key={account.id}>
                            <h3>{account.name}</h3>
                            <p>{account.type}</p>
                            <h2>ksh {Number(account.balance || 0).toLocaleString()}</h2>
                             <button onClick={() => editAccount(account)}>
                                      Edit
                             </button>
                            <button
                            onClick={()=>
                                setAccounts(accounts.filter(item=> item.id !==account.id  
                                ))
                            }
                            
                            >
                                <Trash2 size={16}/>Delete
                            </button>
                        </div>
                    );
                })}
                    </div>
            </section>
       </div>
             );
               
        }    
export default Accounts;
            
