import React, { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// 5. The reduceer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };

    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads

let initialState = {
  budget: 2000,
  expenses: [
    // { id: uuidv4(), name: "Shopping", cost: 50, date: "17 June 2021" },
    // { id: uuidv4(), name: "Holiday", cost: 300, date: "17 June 2021" },
    // { id: uuidv4(), name: "Transportation", cost: 70, date: "17 June 2021" },
    // { id: uuidv4(), name: "Fuel", cost: 40, date: "17 June 2021" },
    // { id: uuidv4(), name: "Child Care", cost: 500, date: "17 June 2021" },
  ],
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const localData = localStorage.getItem("state");
    if (localData) {
      return JSON.parse(localData);
    } else {
      return initialState;
    }
  });

  // useEffect(, []);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  console.log(state);
  // 5. Returns our context. Pass in the values we want to expose
  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
