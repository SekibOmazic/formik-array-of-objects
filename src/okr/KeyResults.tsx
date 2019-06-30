import React, { FC } from "react";
import { FieldArray, FormikErrors } from "formik";
import { Objective, ObjectiveStatus } from "../types";
import { KeyResultItem } from "./KeyResultItem";
import { NewKeyResult } from "./NewKeyResult";

interface Props {
  objective: Objective;
  errors: FormikErrors<Objective>;
}

export const KeyResults: FC<Props> = ({ objective, errors }) => {
  const progress = objective.keyResults.length
    ? Math.round(
        (objective.keyResults.filter(({ completed }) => completed).length /
          objective.keyResults.length) *
          100
      )
    : 0;

  const editable = objective.status === ObjectiveStatus.Proposal;

  return (
    <div className="mb4">
      <h4>Key Results</h4>
      {errors.keyResults && typeof errors.keyResults === "string" && (
        <div>{errors.keyResults}</div>
      )}
      <div className="flex">
        <span className="pr3">{progress}%</span>
        <progress className="w-100" max="100" value={progress} />
      </div>
      <ul className="list pl0">
        <FieldArray
          name="keyResults"
          render={arrayHelpers => (
            <div>
              {objective.keyResults.map((keyResult, index) => (
                <KeyResultItem
                  key={index}
                  nameCompleted={`keyResults.${index}.completed`}
                  completed={keyResult.completed}
                  nameTitle={`keyResults.${index}.title`}
                  title={keyResult.title}
                  editable={editable}
                  remove={() => arrayHelpers.remove(index)}
                />
              ))}

              {editable && (
                <NewKeyResult
                  add={title => {
                    arrayHelpers.push({ title, completed: false });
                  }}
                />
              )}
            </div>
          )}
        />
      </ul>
    </div>
  );
};
