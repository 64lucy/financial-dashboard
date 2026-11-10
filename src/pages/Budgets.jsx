
    import "./Budgets.css";
function Budgets({ budgetData, setBudgets }) {
  async function updateLimit(id, newLimit) {
    const limit = Number(newLimit);

    if (!Number.isFinite(limit) || limit <= 0) return;
      
     try {
    const response = await fetch(
      `https://financial-dashboard-2nnh.onrender.com/api/budgets/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ limit })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update budget");
    }

    const updatedBudget = await response.json();

    setBudgets(previousBudgets =>
      previousBudgets.map(budget =>
        budget._id === id ? updatedBudget : budget
      )
    );

  } catch (error) {
    console.log("Budget update error:", error);
  }
}

    return(
         <div className="budgets-page">
      <header className="page-header">
            <h1>Budgets</h1>
            <p>Set and monitor your budgets,spending limits and category wise expenses.</p>
          </header>
       <div className="budget-list">
        {budgetData.map(budget => {
          const percentage = budget.limit > 0
            ? (budget.spent / budget.limit) * 100
            : 0;

          const remaining = budget.limit - budget.spent;

          return (
            <div className="budget-card" key={budget._id}>
              <h3>{budget.category}</h3>

              <p>
                Spent: Ksh {budget.spent.toLocaleString()}
              </p>

              <p>
                Limit: Ksh {budget.limit.toLocaleString()}
              </p>

              <p>
                {percentage.toFixed(1)}% used
              </p>

              <progress
                value={Math.min(percentage, 100)}
                max="100"
              />

              <p>
                {remaining >= 0
                  ? `Remaining: Ksh ${remaining.toLocaleString()}`
                  : `Over budget by: Ksh ${Math.abs(remaining).toLocaleString()}`
                }
              </p>

              <label>
                Update budget limit:
                <input
                  type="number"
                  min="1"
                  defaultValue={budget.limit}
                  onBlur={event =>
                    updateLimit(budget._id, event.target.value)
                  }
                />
              </label>
            </div>
          );
        })}
      </div>
      </div>
  );
}

export default Budgets;