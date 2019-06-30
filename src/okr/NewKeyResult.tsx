import React, { useState, FC, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";

interface Props {
  add: (title: string) => void;
}
export const NewKeyResult: FC<Props> = ({ add }) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState("");

  const ref = useRef(null);

  const reset = () => {
    setText("");
    setEditMode(false);
  };

  useOnClickOutside(ref, () => {
    reset();
  });

  return editMode ? (
    <div className="pl3" ref={ref}>
      <input
        type="text"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        className="w-100 pv2 ph3 ba b--blue bw1 mb2 br2"
      />
      <div>
        <button
          className="bg-green ph3 pv2 white br2 mr3"
          onClick={() => {
            add(text);
            reset();
          }}
        >
          Save
        </button>
        <button className="bg-transparent bn" onClick={reset}>
          ✖
        </button>
      </div>
    </div>
  ) : (
    <button
      type="button"
      className="bg-light-gray pv2 ph3 bn br2"
      onClick={() => setEditMode(true)}
    >
      New
    </button>
  );
};
