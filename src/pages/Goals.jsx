
import "./Goals.css";
import {useEffect,useState} from "react";
function Goals(){
    const [goals,setGoals]=useState(()=>{
        const savedGoals=localStorage.getItem("financialGoals");

        return savedGoals
        ? JSON.parse(savedGoals)
        :[

          { id: 1, name: "Emergency Fund", target: 100000, saved: 65000 },
          { id: 2, name: "Laptop", target: 100000, saved: 55000 },
          { id: 3, name: "Vacation", target: 100000, saved: 25000 }
        ];
    });
    const[goalName,setGoalName]=useState("");
    const [target,setTarget]=useState("");
     useEffect(() => {
    localStorage.setItem("financialGoals", JSON.stringify(goals));
  }, [goals]);
  
   function addGoal(event) {
    event.preventDefault();

    if (!goalName.trim() || Number(target) <= 0) return;
       const newGoal = {
      id: Date.now(),
      name: goalName.trim(),
      target: Number(target),
      saved: 0
    };
     
    setGoals(previousGoals => [...previousGoals, newGoal]);

    setGoalName("");
    setTarget("");
  }

  function updateSavedAmount(id, amount) {
    const value = Number(amount);
  if (!Number.isFinite(value) || value < 0) return;

    setGoals(previousGoals =>
      previousGoals.map(goal =>
        goal.id === id
          ? { ...goal, saved: value }
          : goal
      )
        );
  }

  function deleteGoal(id) {
    setGoals(previousGoals =>
      previousGoals.filter(goal => goal.id !== id)
    );
  }

    return(
        <div className="goal-page">
            <header className="page-header">
            <h1>Goals</h1>
            <p>Set targets and track your savings  progress.</p>
            </header>
           
         <form onSubmit={addGoal} className="goal-form">
        <input
          type="text"
          placeholder="Goal name"
          value={goalName}
          onChange={event => setGoalName(event.target.value)}
          required
        />
         <input
          type="number"
          placeholder="Target amount (Ksh)"
          min="1"
          value={target}
          onChange={event => setTarget(event.target.value)}
          required
        />

        <button type="submit">Add Goal</button>
      </form>

      <div className="goals-list">
        {goals.map(goal => {
          const percentage = goal.target > 0
            ? (goal.saved / goal.target) * 100
            : 0;
             return (
            <div className="goal-card" key={goal.id}>
              <h3>{goal.name}</h3>

              <p>Target: Ksh {goal.target.toLocaleString()}</p>
              <p>Saved: Ksh {goal.saved.toLocaleString()}</p>

              <p>{percentage.toFixed(1)}% completed</p>
                            <progress
                value={Math.min(percentage, 100)}
                max="100"
              />

              <label>
                Update saved amount:
                <input
                  type="number"
                  min="0"
                  value={goal.saved}
                  onChange={event =>
                    updateSavedAmount(goal.id, event.target.value)
                  }
                />
              </label>

                <button
                type="button"
                onClick={() => deleteGoal(goal.id)}
              >
                Delete Goal
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Goals;