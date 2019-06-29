import React from "react";
import { Field } from "formik";
import { Input } from "./Input";

export const KeyResultComponent = ({
  nameTitle,
  nameCompleted,
  title,
  completed,
  editable,
  remove
}) => {
  return (
    <li className="flex justify-between mb3">
      <div className={"pa3 flex w-100"}>
        <Field name={nameCompleted}>
          {({ field }) => (
            <input
              type="checkbox"
              className={"mr3"}
              {...field}
              checked={completed}
            />
          )}
        </Field>
        <Field
          name={nameTitle}
          value={title}
          disabled={!editable}
          component={Input}
        />
      </div>
      {editable && (
        <button
          type="button"
          className="bg-transparent pa0 bn pointer"
          onClick={remove}
        >
          <span role="img" aria-label="remove">
            ❌
          </span>
        </button>
      )}
    </li>
  );
};
