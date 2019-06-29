import React, { FC } from "react";
import { Field } from "formik";
import { Input } from "./Input";
import { Objective, ObjectiveStatus } from "../types";

interface Props {
  objective: Objective;
}
export const ObjectiveComponent: FC<Props> = ({ objective }) => {
  return (
    <div className="mb4">
      <h1>Objective</h1>
      <Field
        name="name"
        value={objective.name}
        disabled={objective.status === ObjectiveStatus.Approved}
        component={Input}
      />
    </div>
  );
};
