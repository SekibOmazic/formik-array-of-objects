import React, { FC, useState } from "react";
import "./App.css";
//import { OKR1 } from "./OKR1";
import { OKR } from "./okr/OKR";
import { ObjectiveStatus } from "./types";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const newObjective = () => ({
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
});

const App: FC = () => {
  const [open, setOpen] = useState(false);
  const [objective, setObjective] = useState(newObjective());

  const close = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      {/* <OKR1 objective={objective} /> */}
      <button
        onClick={() => {
          setObjective(newObjective());
          setOpen(true);
        }}
      >
        Open Modal
      </button>

      <Modal isOpen={open} style={customStyles} contentLabel="OKR">
        <OKR objective={objective} close={close} />
      </Modal>
    </div>
  );
};

export default App;
