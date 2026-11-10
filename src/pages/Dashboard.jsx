
    import "./Dashboard.css";
    import {useState} from "react";
    import { UserRound } from "lucide-react";

    import{
        ResponsiveContainer,
        PieChart,
        Pie,
        Cell,
        Tooltip,
        Legend,
        BarChart,
        XAxis,
        YAxis,
        Bar
    } from 'recharts';

function Dashboard({
    totalBalance,
    totalIncome,
    totalExpenses,
    totalSavings,
    spendingData,
    monthlychartData,
    budgetData,
    setBudgets,
    showModal,
    setShowModal,
    editingId,
    description,
    setDescription,
    type,
    setType,
    category,
    setCategory,
    date,
    setDate,
    amount,
    setAmount,
    addTransaction,
    error,
    searchTerm,
    setSearchTerm,
    filteredTransactions,
    editTransaction,
    deleteTransaction


} ){
    
    const[showProfile,setShowProfile]=useState(false);
    return(

    <main id="Dashboard" className="dashboard">
    <header className="dashboard-header">
  <h1>Financial Dashboard</h1>
  <div className="user-profile">
  <button 
  type="button"
  className="profile-button"
  onClick={()=> setShowProfile(!showProfile)}
  >
    <UserRound size ={24}/>
    </button>
   {showProfile && (
    <div className="profile-dropdown">
        <p>My Profile</p>
        <p>Settings</p>
        <p>Log Out</p>
    </div>
   )}
  </div>
  <p>Here's your financial overview for today</p>
    </header>
    
    
  <section id="Accounts" className="summary-cards">
    <div className="card balance-card">
      <h2>Total Balance</h2>
      <p>Ksh {totalBalance.toLocaleString()}</p>
    </div>

    <div className="card income-card">
     <h2>Income</h2>
     <p>Ksh{totalIncome.toLocaleString()}</p> 
    </div>
    <div className="card expenses-card">
      <h2>Expenses</h2>
      <p>Ksh{totalExpenses.toLocaleString()}</p>
    </div>
    <div className="card savings-card">
      <h2>Savings</h2>
      <p>Ksh{totalSavings.toLocaleString()}</p>
    </div>
  </section>
   

      <section id="Analytics" className="overview-card">
      <section className="spending-Chart">
        <h2>spending by cartegory</h2>
        <ResponsiveContainer width="100%" height={340}>
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
      <Bar dataKey="expenses" name="Expenses (ksh)" fill="#ef4444"/>
      <Bar dataKey="savings" name="Saving (ksh" fill="#3b82f6"/>
    </BarChart>
   </ResponsiveContainer>
  
   </section>
   </div>
  

     <section id="Transactions" className="transactions-section">
     <button 
     type="button"
     onClick={()=> setShowModal(true)}
     >
      +Add Transaction
     </button>

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
    <div className="transaction-row" key={transaction._id}>
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
   onClick={()=>deleteTransaction(transaction._id)}>
    Delete
    </button>
    </div>
    </div>
    ))}
   </div>
  </section>
</main>
)
}
export default Dashboard;