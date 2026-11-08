
import {useEffect,useState} from 'react'
import './App.css'
import {Routes,Route,Navigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Budgets from './pages/Budgets'
import Goals from './pages/Goals'
import Reports from './pages/Reports'
import Sidebar from "./components/Sidebar";
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

import {NavLink} from 'react-router-dom'
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
      {id: 1, category:"Food",limit:10000},
      {id: 2, category:"Transport",limit:6000},
      {id: 3, category:"Bills",limit:8000},
      {id: 4, category:"Shopping",limit:9000},
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
  <div className="dashboard-layout">
    <Sidebar/>
    <main className="main-content">

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

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
        <Route
        path="/dashboard"
        element={
          <Dashboard
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalSavings={totalSavings}
          spendingData={spendingData}
          monthlychartData={monthlychartData}
          budgetData={budgetData}
          setBudgets={setBudgets}
          showModal={showModal}
          setShowModal={setShowModal}
          editingId={editingId}
          description={description}
          setDescription={setDescription}
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          date={date}
          setDate={setDate}
          amount={amount}
          setAmount={setAmount}
          addTransaction={addTransaction}
          error={error}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredTransactions={filteredTransactions}
          editTransaction={editTransaction}
          deleteTransaction={deleteTransaction}
          />
         
        }
        />
         <Route path="/accounts" element={<Accounts/>}/>
          <Route 
          path="/transactions"
           element={
            <Transactions
          transactions={transactions}
          deleteTransaction={deleteTransaction}
          editTransaction={editTransaction}
          setShowModal={setShowModal}
          />
          }
          />
           <Route
            path="/analytics" 
            element={<Analytics
            spendingData={spendingData}
            monthlychartData={monthlychartData}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            totalSavings={totalSavings}
            />
            }
            />
            <Route
             path="/budgets"
              element={<Budgets
              budgetData={budgetData}
              setBudgets={setBudgets}
              />}/>
             <Route path="/goals" element={<Goals/>}/>
              <Route path="/reports"
               element={
               <Reports
              transactions={transactions}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              totalSavings={totalSavings}
              monthlychartData={monthlychartData}
              spendingData={spendingData}
              />
              }
              />
      </Routes>
    </main>
  </div>
 );
}
export default App;
