import React, { FC } from "react";
import "./App.css";
import { OKR1 } from "./OKR1";

const App: FC = () => {
  const objective = {
    name: "Sekib",
    amount: 500,
    keyResults: [
      {
        title: "Learn React hooks",
        completed: false
      },
      {
        title: "learn bulma for styling?",
        completed: true
      }
    ]
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <OKR1 objective={objective} />
    </div>
  );
};

export default App;
