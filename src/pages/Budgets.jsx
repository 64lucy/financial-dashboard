
    import "./Budgets.css";
function Budgets({ budgetData, setBudgets }) {
  function updateLimit(id, newLimit) {
    const limit = Number(newLimit);

    if (!Number.isFinite(limit) || limit <= 0) return;

    setBudgets(previousBudgets =>
      previousBudgets.map(budget =>
        budget.id === id
          ? { ...budget, limit }
          : budget
      )
    );
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
            <div className="budget-card" key={budget.id}>
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
                    updateLimit(budget.id, event.target.value)
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