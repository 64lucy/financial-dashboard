
import "./Analytics.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";


    function Analytics({
  spendingData,
  monthlychartData,
  totalIncome,
  totalExpenses,
  totalSavings
}) {
     const COLORS = ["#8b5cf6", "#00C49F", "#FFBB28", "#FF8042"];
     return(
        <div className="analytics-page">
        <header className="page-header">
            <h1>Analytics</h1>
            <p>Analyse your spending patterns,income trends and cash flow.</p>
          </header>

            <div className="analytics-summary">
        <div className="analytics-card">
          <h3>Total Income</h3>
          <h2>Ksh {totalIncome.toLocaleString()}</h2>
        </div>

        <div className="analytics-card">
          <h3>Total Expenses</h3>
          <h2>Ksh {totalExpenses.toLocaleString()}</h2>
        </div>

        <div className="analytics-card">
          <h3>Total Savings</h3>
          <h2>Ksh {totalSavings.toLocaleString()}</h2>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="analytics-card">
          <h2>Spending by Category</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {spendingData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card">
          <h2>Monthly Cash Flow</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlychartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthly" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#00C49F" />
              <Bar dataKey="expenses" fill="#FF8042" />
              <Bar dataKey="savings" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
