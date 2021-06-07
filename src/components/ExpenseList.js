import React, { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../context/AppContext";

const ExpenseList = () => {
  const { expenses } = useContext(AppContext);

  const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);

  useEffect(() => {
    setfilteredExpenses(expenses);
  }, [expenses]);

  const handleChange = (event) => {
    const searchResults = expenses.filter(
      (filteredExpense) =>
        filteredExpense.name.includes(event.target.value) ||
        filteredExpense.date.includes(event.target.value) ||
        filteredExpense.cost.toString().includes(event.target.value)
    );
    setfilteredExpenses(searchResults);
  };

  return (
    <>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Type to search..."
        onChange={handleChange}
      />
      <ul className="list-group mt-3 mb-3">
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            name={expense.name}
            cost={expense.cost}
            date={expense.date}
          />
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
