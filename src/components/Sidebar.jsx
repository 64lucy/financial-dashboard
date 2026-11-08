  
  import { NavLink } from "react-router-dom";
  import{
    LayoutDashboard,
    Wallet,
    ArrowLeftRight,
    ChartNoAxesCombined,
    CalendarRange,
    Target,
    FileText
  } from 'lucide-react';

   function Sidebar(){
    return(
    <div className="sidebarvp">
      <h1 className="sidebar-logo">
        <ChartNoAxesCombined size={24}/>
        Finance
      </h1>
      <NavLink to="/dashboard" className={({isActive})=> isActive ? "active":""}><LayoutDashboard size={18}/>Dashboard</NavLink>
       <NavLink to="/accounts"className={({isActive})=> isActive ? "active":""}><Wallet size={18}/>Accounts</NavLink>
        <NavLink to="/transactions" className={({isActive})=> isActive ? "active":""}><ArrowLeftRight size={18}/>Transactions</NavLink>
         <NavLink to="/analytics"className={({isActive})=> isActive ? "active":""}><ChartNoAxesCombined  size={24}/>Analytics</NavLink>
          <NavLink to="/budgets"className={({isActive})=> isActive ? "active":""}><CalendarRange size={18}/>Budgets</NavLink>
           <NavLink to="/goals"className={({isActive})=> isActive ? "active":""}><Target size={18}/>Goals</NavLink>
            <NavLink to="/reports"className={({isActive})=> isActive ? "active":""}><FileText size={18}/>Reports</NavLink>
            </div>
    )
    }
    export default Sidebar 