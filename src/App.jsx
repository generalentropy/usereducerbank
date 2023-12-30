import { useReducer } from "react";
import "./styles.css";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "payLoan":
      if (state.loan === 0)
        return { ...state, message: "You have no current loan" };
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        message: "📈",
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        message: "🤑",
      };

    case "closeAccount":
      if (state.balance === 0 && state.loan === 0)
        return { ...state, isActive: false, message: "Don't come back!😠" };
      return {
        ...state,
        message: "Lol, nope, your loan and balance must be 0 🙂",
      };

    case "withdraw":
      if (state.balance <= 0)
        return { ...state, message: "Sorry, your balance must be > 0" };
      return {
        ...state,
        balance: state.balance - action.payload,
        message: "😕",
      };

    case "openAccount":
      if (state.isActive) return { ...state };
      return {
        ...state,
        isActive: true,
        balance: 500,
        message: "Welcome to our bank! 🎉 Your money is now our money",
      };

    case "withdrawAll":
      if (state.balance > 0) return { ...state, balance: 0, message: "😒" };
      return { ...state, message: "Seriously..." };

    case "requestLoan":
      if (state.loan > 0)
        return { ...state, message: "You already have a loan" };

      return {
        ...state,
        loan: action.payload + state.loan,
        balance: state.balance + action.payload,
        message: "🙂💰",
      };

    default:
      throw new Error("Unknown action");
  }
}

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  message: "",
};

export default function App() {
  const [{ isActive, balance, loan, message }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>
        Welcome to
        <br />
        useReducer Bank
      </h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount", payload: 500 })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          className="wd"
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>

        <button
          className="wd"
          onClick={() => dispatch({ type: "withdrawAll" })}
          disabled={!isActive}
        >
          Withdraw all
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>

      <p className="message">{message}</p>
    </div>
  );
}
