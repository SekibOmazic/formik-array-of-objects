import React, { useState } from "react";
import { Field, getIn } from "formik";

export const KeyResultItem = ({
  nameTitle,
  nameCompleted,
  title,
  completed,
  editable,
  remove
}) => {
  const [isEditMode, setIsEditmode] = useState(false);

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
        <Field name={nameTitle} value={title}>
          {({ field, form: { errors } }) => {
            const errorMessage = getIn(errors, field.name);
            const clazz =
              isEditMode && editable
                ? "f4 outline-0 w-100 bg-white ba b--blue bw1"
                : "outline-0 bg-transparent bn w-100 pa0";

            return (
              <>
                <div className="w-100">
                  <input
                    type="text"
                    {...field}
                    disabled={!editable}
                    className={clazz}
                    onFocus={() => setIsEditmode(true)}
                    onBlur={() => {
                      field.onBlur();
                      setIsEditmode(false);
                    }}
                  />
                </div>
                {errorMessage && (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
              </>
            );
          }}
        </Field>
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
