import React, { FC } from "react";
import "./App.css";
//import { OKR1 } from "./OKR1";
import { OKR } from "./okr/OKR";
import { ObjectiveStatus } from "./types";

const App: FC = () => {
  const objective = {
    name: "Sekib",
    amount: 500,
    status: ObjectiveStatus.Proposal,
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
      {/* <OKR1 objective={objective} /> */}
      <OKR objective={objective} />
    </div>
  );
};

export default App;
