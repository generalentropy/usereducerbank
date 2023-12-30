import { useReducer } from "react";
import "./styles.css";
import "./App.css";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

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
        message: "Welcome to our bank! Your money is now our money",
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
  }
}

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  message: "",
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>
        Welcome to
        <br />
        useReducer Bank
      </h1>
      <p>Balance: {state.balance}</p>
      <p>Loan: {state.loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount", payload: 500 })}
          disabled={state.isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!state.isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          className="wd"
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!state.isActive}
        >
          Withdraw 50
        </button>

        <button
          className="wd"
          onClick={() => dispatch({ type: "withdrawAll" })}
          disabled={!state.isActive}
        >
          Withdraw all
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!state.isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!state.isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!state.isActive}
        >
          Close account
        </button>
      </p>

      <p className="message">{state.message}</p>
    </div>
  );
}
