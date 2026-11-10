import "./Reports.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
 
} from "recharts";

function Reports({
    transactions,
    totalIncome,
    totalExpenses,
    totalSavings,
    monthlychartData,
    spendingData
}) {

    function exportToCSV() {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];

  const rows = transactions.map(transaction => [
    transaction.date,
    transaction.description,
    transaction.category,
    transaction.type,
    transaction.amount
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "financial-report.csv";
  link.click();

  URL.revokeObjectURL(url);
}

    return(
        <div className="report-page">
            <h1>Reports</h1>
            <p>Review financial performanceand transaction history.</p>
            <div className="report-summary">
  <div className="report-card">
    <h3>Total Income</h3>
    <p>Ksh {totalIncome.toLocaleString()}</p>
  </div>

  <div className="report-card">
    <h3>Total Expenses</h3>
    <p>Ksh {totalExpenses.toLocaleString()}</p>
  </div>

  <div className="report-card">
    <h3>Total Savings</h3>
    <p>Ksh {totalSavings.toLocaleString()}</p>
  </div>
    </div>
    <div className="monthly-report">
        <h2>Monthly Financial Performance</h2>
        <ResponsiveContainer width="100%" height={350}>
  <BarChart data={monthlychartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="monthly" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="income" fill="#00C49F" name="Income" />
    <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
  </BarChart>
</ResponsiveContainer>
    </div>
    <div className="expense-report">
  <h2>Expense Breakdown by Category</h2>
  <ResponsiveContainer width="100%" height={350}>
  <PieChart>
    <Pie
      data={spendingData}
      dataKey="value"
      nameKey="name"
      outerRadius={120}
      label
    >
      {spendingData.map((entry, index) => (
        <Cell
          key={entry.name}
          fill={["#00C49F", "#0088FE", "#FFBB28", "#FF8042"][index % 4]}
        />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
    </div>
    <div className="transaction-report">
  <h2>Transaction History</h2>
  <table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Description</th>
      <th>Category</th>
      <th>Type</th>
      <th>Amount</th>
    </tr>
  </thead>

  <tbody>
    {transactions.map(transaction => (
      <tr key={transaction._id}>
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td>{transaction.category}</td>
        <td>{transaction.type}</td>
        <td>Ksh {transaction.amount.toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>
<button onClick={exportToCSV}>
  Export Report to CSV
</button>

</div>
     <div className="savings-report">
  <h2>Savings Analysis</h2>
  <p>Total Savings: Ksh {totalSavings.toLocaleString()}</p>

<p>
  Savings Rate: {
    totalIncome > 0
      ? ((totalSavings / totalIncome) * 100).toFixed(1)
      : 0
  }%
</p>
</div>

    </div>
      ); 
    }

export default Reports;