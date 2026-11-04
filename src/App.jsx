
import {useEffect,useState} from 'react'
import './App.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
  }from 'recharts'


  import{
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  ChartNoAxesCombined,
  CalendarRange,
  Target,
  FileText
}from 'lucide-react'

function App() {

    const [transactions, setTranasactions]=useState(()=> {
      const savedTransactions=localStorage.getItem("transactions");
      return savedTransactions ?JSON.parse(savedTransactions):[];
    });

     let totalIncome=0; 
    for(let i=0; i<transactions.length;i++){
      if(transactions[i].type==="Income"){
        totalIncome += transactions[i].amount;
      }
    }

    let totalExpenses=0; 
    for(let i=0; i<transactions.length;i++){
      if(transactions[i].type==="Expense"){
        totalExpenses +=transactions[i].amount;
      }
    }
 
    let totalSavings =totalIncome-totalExpenses;
     
      let totalBalance=totalIncome-totalExpenses;


     const[searchTerm,setSearchTerm]=useState("");
    const filteredTransactions = transactions.filter((transaction)=>
    transaction.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
          );
    

    const [description,setDescription]=useState("");
    const [type,setType]=useState("Income");
    const [amount,setAmount]=useState("");
    const [error,setError]=useState("");
    const [date,setDate]=useState("");
    const [category,setCategory]=useState("Food");
    const [editingId,setEditingId]=useState(null);
    const [showModal, setShowModal]=useState(false);

  
    const scrollToSection=(sectionId)=>{
   const section = document.getElementById(sectionId);
   if(section){
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
  };

    const [budgets, setBudgets]=useState(()=>{
      const savedBudgets=localStorage.getItem("budgets");
      return savedBudgets? JSON.parse(savedBudgets):[
      {category:"Food",limit:10000},
      {category:"Transport",limit:6000},
      {category:"Bills",limit:8000},
      {category:"Shopping",limit:9000},
    ];
    });


   useEffect(()=>{
    localStorage.setItem("transactions",JSON.stringify(transactions));
   },[transactions]);

   useEffect(()=> {
    localStorage.setItem("budgets", JSON.stringify(budgets));
   }, [budgets]);
  
    function addTransaction(){

      if(!description.trim()){
        setError("please enter a description.");
        return;
      }
  
       if(amount===""|| Number(amount)<=0){
        setError("please enter an amount greater than zero.");
      return;
       }
       setError("");

      if(!date){
        setError("please select a transaction date.");
        return;
      }
      if(editingId !==null){
        setTranasactions((previousTransactions)=>
        previousTransactions.map((transaction)=>
        transaction.id===editingId 
        ?{
          ...transaction,
          description:description.trim(),
          type:type,
          amount:Number(amount),
          date:date,
          category:category,
        }
        :transaction
      )
    );
    setEditingId(null);
    setDescription("");
    setAmount("");
    setDate("");
    setType("Income");
    setCategory("Food");
    setShowModal(false);
    return;
      }
      const newTransaction={
        id: Date.now(),
        description:description.trim(),
        type:type,
        amount:Number(amount),
        date:date,
        category:category,
      };
      
      setTranasactions((previousTransactions)=>[...previousTransactions,newTransaction]);

      setDescription("");
    setAmount("");
    setDate("");
    setType("Income");
    setCategory("Food");
    setShowModal(false);
    }
     const monthlyIncome = Array(12).fill(0);
     const monthlyExpenses =Array(12).fill(0);
     const monthlySavings =Array(12).fill(0);
      
     transactions.forEach((transaction)=>{
      const monthIndex=new Date(transaction.date).getMonth();
      if(transaction.type==="Income"){
        monthlyIncome[monthIndex]+=transaction.amount;
      }else if(transaction.type==="Expense"){
        monthlyExpenses[monthIndex]+=transaction.amount;
      }
     });

     for(let i=0; i<12; i++){
      monthlySavings[i]=monthlyIncome[i]-monthlyExpenses[i];
     }
     const monthlychartData=[
      {monthly:"Jan", income: monthlyIncome[0], expenses:monthlyExpenses[0], savings:monthlySavings[0] },
      {monthly:"Feb", income: monthlyIncome[1], expenses:monthlyExpenses[1], savings:monthlySavings[1] },
      {monthly:"Mar", income: monthlyIncome[2], expenses:monthlyExpenses[2], savings:monthlySavings[2] },
      {monthly:"Apr", income: monthlyIncome[3], expenses:monthlyExpenses[3], savings:monthlySavings[3] },
      {monthly:"May", income: monthlyIncome[4], expenses:monthlyExpenses[4], savings:monthlySavings[4] },
      {monthly:"Jun", income: monthlyIncome[5], expenses:monthlyExpenses[5], savings:monthlySavings[5] },
      {monthly:"Jul", income: monthlyIncome[6], expenses:monthlyExpenses[6], savings:monthlySavings[6] },
      {monthly:"Aug", income: monthlyIncome[7], expenses:monthlyExpenses[7], savings:monthlySavings[7] },
      {monthly:"Sep", income: monthlyIncome[8], expenses:monthlyExpenses[8], savings:monthlySavings[8] },
      {monthly:"Oct", income: monthlyIncome[9], expenses:monthlyExpenses[9], savings:monthlySavings[9] },
      {monthly:"Nov", income: monthlyIncome[10],expenses:monthlyExpenses[10],savings:monthlySavings[10] },
      {monthly:"Dec", income: monthlyIncome[11],expenses:monthlyExpenses[11],savings:monthlySavings[11] },
     ]

      const budgetData=budgets.map((budget)=>{
      const spent= transactions
      .filter(
       ( transaction)=> 
        transaction.type==="Expense" &&
        transaction.category===budget.category )
        .reduce(
          (total,transaction)=> total+transaction.amount,0 );
        return{
          ...budget,
          spent,
          percentage:(spent/budget.limit)*100,
        };
    });
    
    const spendingData =["Food","Transport","Bills","Shopping"].map(
      (category)=>({
              name:category,
              value:transactions
              .filter(
                (transaction)=>
                transaction.type==="Expense" &&
                transaction.category===category
)
  .reduce((total,transaction)=> total+transaction.amount,0),
      })
    );
    
  
    function deleteTransaction(id){
    setTranasactions((previousTransactions)=>
    previousTransactions.filter(
      (transaction)=>transaction.id !== id
    )
  );
    }
 function editTransaction(transaction){
  setEditingId(transaction.id);
  setDescription(transaction.description);
  setType(transaction.type);
  setAmount(String(transaction.amount));
  setDate(transaction.date);
  setCategory(transaction.category);
  setShowModal(true);
 }

  return (
<div>

  <div className="dashboard-layout">
  <div className="sidebarvp">
    <h1 className="sidebar-logo">
    <ChartNoAxesCombined size={24}/>
    Finance</h1>
    <p onClick={()=>scrollToSection("Dashboard")}><LayoutDashboard size={18}/>Dashboard</p>
    <p onClick={()=>scrollToSection("Accounts")}><Wallet size={18}/> Accounts</p>
    <p onClick={()=>scrollToSection("Transactions")}><ArrowLeftRight size={18}/>Transactions</p>
    <p onClick={()=>scrollToSection("Analytics")}><ChartNoAxesCombined size={18}/> Analytics</p>
    <p onClick={()=>scrollToSection("Budgets")}><CalendarRange size={18}/> Budgets</p>
    <p onClick={()=>scrollToSection("Goals")}><Target size={18}/>Goals</p>
    <p onClick={()=>scrollToSection("Reports")}><FileText size={18}/> Reports</p>
    </div>
    

    <main id="Dashboard" className="dashboard">
    <header className="dashboard-header">
  <h1>Financial Dashboard</h1>
  <p>Here's your financial overview for today</p>
    </header>
    
    
  <section id="Accounts" className="summary-cards">
    <div className="card balance-card">
      <h2>Total Balance</h2>
      <p>ksh {totalBalance.toLocaleString()}</p>
    </div>

    <div className="card income-card">
     <h2>Income</h2>
     <p>ksh{totalIncome.toLocaleString()}</p> 
    </div>
    <div className="card expenses-card">
      <h2>Expenses</h2>
      <p>ksh{totalExpenses.toLocaleString()}</p>
    </div>
    <div className="card savings-card">
      <h2>Savings</h2>
      <p>ksh{totalSavings.toLocaleString()}</p>
    </div>
  </section>
   

      <section id="Analytics" className="overview-card">
      <section className="spending-Chart">
        <h2>spending by cartegory</h2>
        <ResponsiveContainer width="100%" height={720}>
          <PieChart>
            <Pie
            data={spendingData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={window.innerWidth<= 768 ? 95 :140}
            label
            >
              {spendingData.map((entry,index)=>(
                <Cell 
                key={entry.name}
                fill={["brown","#00C49F","#FFBB28","#FF8042"][index]}
                />
          
             ))}
              </Pie>
              <Tooltip/>
              <Legend/>
              </PieChart>
              </ResponsiveContainer>
          </section>    

  <section id="Budgets" className="budgets">
    <h2>BudgetTracking</h2>

    {budgetData.map((budget)=>(
      <div className="budget-item" key={budget.category}>
        <div className="budget-header">
      <h3>{budget.category}</h3>

      <span>
        ksh{budget.spent.toLocaleString()} /ksh{""}
        {budget.limit.toLocaleString()}
        </span>
        </div>

        <div className="budget-progress">
        <div
        className="budget-progress-fill"
        style={{
          width: `${Math.min(budget.percentage,100)}%`,
        }}
        />
      </div>
      

      <p>{budget.percentage.toFixed(1)}%used</p>
     
      
      <input
      className="budget-input"
      type="number"
      min="1"
      value={budget.limit}
      onChange={(event)=>{
        const newLimit=Number(event.target.value);

        setBudgets((previousBudgets)=>
        previousBudgets.map((item)=>
          item.category===budget.category
        ?{...item,limit:newLimit}
        :item
        )
      );
    }}
        />
        </div>
  ))}
  </section>   
    </section>
      
      <div className="cash-flow-layout">
      <section  id="Goals" className="cash-flow-chart">
   <h2>Monthly Cash Flow</h2>
   <ResponsiveContainer width="100%" height={300}>
    <BarChart data={monthlychartData}>
      <XAxis dataKey="monthly"/>
      <YAxis/>
      <Tooltip/>
      <Legend/>
      <Bar dataKey="income" name="Income ksh" fill="#16a34a"/>
      <Bar dataKey="expenses" name="Expenses (ksh" fill="#ef4444"/>
      <Bar dataKey="savings" name="Saving (ksh" fill="#3b82f6"/>
    </BarChart>
   </ResponsiveContainer>
   <h2>Monthly savings</h2>
   </section>
   </div>
  

     <section id="Transactions" className="transactions-section">
     <button 
     type="button"
     onClick={()=> setShowModal(true)}
     >
      +Add Transaction
     </button>

      {showModal &&(
        <div className="modal-overlay">
          <div className="modal-content">
      <button
      type="button"
      className="modal-close"
      onClick={()=> setShowModal(false)}
      >
        X
      </button>
      <form className="transaction-form">
          
 
        <h2>
          {editingId !==null ? "Editing Transaction":"Add Transaction"}
        </h2>
        <p className="form-subtitle">
          Enter your transaction details below
        </p>
         <input 
    type="text"
    placeholder="Description"
    value={description}
    onChange={(event)=> setDescription(event.target.value)}/>
    <select 
value={category}
onChange={(event)=> setCategory(event.target.value)}>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Bills">Bills</option>
  <option value="Shopping">Shopping</option>
  <option value="Other">Other</option>
</select>   
      <div className="transaction-type-buttons">
        <button 
    type="button"
    className={type==="Income" ? "type-button income-active":"type-button"}
    onClick={()=> setType("Income")}
    >
      Income
    </button>
       <button 
    type="button"
    className={type==="Expense"? "type-button expense-active":"type-button"}
    onClick={()=> setType("Expense")}
    >
      Expense
    </button>
    </div>
     <input
  type="date"
  value={date}
  onChange={(e)=> setDate(e.target.value)}/>
    
       <input
  type="number"
  placeholder="Amount"
  value={amount}
  onChange={(event)=>setAmount(event.target.value)}/>

  
<button type="button" onClick={addTransaction}>
 {editingId !== null ? "Save changes" :"Add Transaction"}
  </button>
</form>
{error && <p className="error-message">{error}</p>}
      
          </div>
        </div>
        
      )}
   




  <h2 className="recent-transactions-heading">
    Recent Transactions
  </h2>
   
  

<input
type="text"
className="transaction-search"
placeholder="search transactions..."
value={searchTerm}
onChange={(event)=>setSearchTerm(event.target.value)} /> 


  <div className="transactions-table">
    <div className="transaction-header">
      <span>Date</span>
       <span>Description</span>
        <span>Category</span>
       <span>Type</span>
        <span>Amount</span>
         <span>Actions</span>
   </div>
  {filteredTransactions.map((transaction)=> (
    <div className="transaction-row" key={transaction.id}>
         <span>{transaction.date}</span>
      <span>{transaction.description}</span>
         <span>{transaction.category}</span>
      <span>{transaction.type}</span>
      <span>{transaction.amount}</span>
       
     <div className="transaction-actions">
        <button
        type="button"
         onClick={()=> editTransaction(transaction)}
         >
          Edit
          </button>
  <button
  type="button"
   onClick={()=>deleteTransaction(transaction.id)}>
    Delete
    </button>
    </div>
    </div>
    ))}
   </div>
  </section>
  <section id="Reports" className="reports-section">
    <h2>Financial Reports</h2>
    <div className="report-cards">
      <div className="report-card">
        <h3>Total Income</h3>
        <p>ksh{totalIncome.toLocaleString()}</p>
      </div>
      <div className="report-card">
        <h3>Total Expenses</h3>
        <p>ksh{totalExpenses.toLocaleString()}</p>
      </div>
      <div className="report-card">
        <h3>Net Savings</h3>
        <p>ksh{totalSavings.toLocaleString()}</p>
      </div>
    </div>
  </section>
</main>
</div>
</div>
);
}
export default App ;




      