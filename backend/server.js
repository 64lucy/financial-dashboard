


const Transaction = require("./models/Transaction");
const Budget = require("./models/Budget");

require("dotenv").config();
const mongoose =require("mongoose");

const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
       "http://localhost:5173",
        "https://64lucy.github.io"
    ]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
   .then(()=>console.log("MongoDB connected successfully"))
   .catch(error=>console.log("MongoDB connection error:",error));

let Transactions =[
    {
        id:1,
        description:"Salary",
        category:"Income",
        amount:40000,
        type:"Income"
    },
    {
        id:2,
        description:"Shopping",
        category:"Shopping",
        amount:5000,
        type:"Expense"
    }
];

app.get("/api",(req,res)=>{
    res.json({
        totalIncome:40000,
        totalExpenses:19060,
        totalBalance:20940,
        Currency:"KSH"
    });
});
 
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
app.get("/api/budgets", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/budgets", async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    const savedBudget = await newBudget.save();

    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/transactions/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.put("/api/budgets/:id", async (req, res) => {
  try {
    const updatedbudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedbudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json(updatedbudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/test", (req, res) => {
    res.send("Server is working");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});