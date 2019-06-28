import React from "react";
import { getIn, FieldProps } from "formik";

export const Input = ({ field, form: { errors }, ...props }) => {
  const errorMessage = getIn(errors, field.name);
  const clazz = props.disabled
    ? "outline-0 bg-transparent bn w-100 pa0"
    : "f4 outline-0 w-100 bg-white ba b--blue bw1";
  return (
    <>
      <div className="w-100">
        <input type="text" {...field} {...props} className={clazz} />
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
