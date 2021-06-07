import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";

const AddExpenseForm = (props) => {
  const { dispatch } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");

  const dateFormatHandler = (date) => {
    const dateObject = new Date(date);

    const month = dateObject.toLocaleString("en-US", { month: "long" });
    const day = dateObject.toLocaleString("en-US", { day: "2-digit" });
    const year = dateObject.getFullYear();

    return day + " " + month + " " + year;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(typeof date);
    const expense = {
      id: uuidv4(),
      name,
      cost: parseInt(cost),
      date: dateFormatHandler(date),
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

    setName("");
    setCost("");
    setDate("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm col-lg-4">
          <label htmlFor="name">Name</label>
          <input
            required="required"
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="col-sm col-lg-4">
          <label htmlFor="cost">Cost</label>
          <input
            required="required"
            type="number"
            min="0"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </div>
        <div className="col-sm col-lg-4">
          <label htmlFor="date">Date</label>
          <input
            required="required"
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
