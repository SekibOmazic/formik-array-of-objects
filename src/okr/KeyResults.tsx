import React, { FC } from "react";
import { FieldArray, FormikErrors } from "formik";
import { Objective, ObjectiveStatus } from "../types";
import { KeyResultComponent } from "./KeyResultComponent";

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
                // <div key={`keyResult-${index}`}>
                //   <li className="flex justify-between mb3">
                //     <div className={"pa3 flex w-100"}>
                //       <Field name={`keyResults.${index}.completed`}>
                //         {({ field }) => (
                //           <input
                //             type="checkbox"
                //             className={"mr3"}
                //             {...field}
                //             checked={keyResult.completed}
                //           />
                //         )}
                //       </Field>
                //       <Field
                //         name={`keyResults.${index}.title`}
                //         value={keyResult.title}
                //         component={Input}
                //       />
                //     </div>
                //     <button
                //       type="button"
                //       className="bg-transparent pa0 bn pointer"
                //       onClick={() => arrayHelpers.remove(index)}
                //     >
                //       <span role="img" aria-label="remove">
                //         ❌
                //       </span>
                //     </button>
                //   </li>
                // </div>

                <KeyResultComponent
                  key={index}
                  nameCompleted={`keyResults.${index}.completed`}
                  completed={keyResult.completed}
                  nameTitle={`keyResults.${index}.title`}
                  title={keyResult.title}
                  deletable={objective.status === ObjectiveStatus.Proposal}
                  remove={() => arrayHelpers.remove(index)}
                />
              ))}

              {objective.status === ObjectiveStatus.Proposal && (
                <button
                  type="button"
                  className="bg-light-gray pv2 ph3 bn br2"
                  onClick={() =>
                    arrayHelpers.push({ title: "", completed: false })
                  }
                >
                  Add
                </button>
              )}
            </div>
          )}
        />
      </ul>
    </div>
  );
};
