import React, { FC } from "react";
import { Formik, FieldArray, Field, FieldProps, getIn } from "formik";
import * as Yup from "yup";
import { Objective } from "./types";

const Input = ({ field, form: { errors } }: FieldProps) => {
  const errorMessage = getIn(errors, field.name);

  return (
    <>
      <div className="w-100">
        <input
          type="text"
          {...field}
          className={"f4 outline-0 w-100 bg-white ba b--blue bw1"}
        />
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};

interface Props {
  objective: Objective;
}

export const OKR1: FC<Props> = ({ objective }) => (
  <div className="sans-serif dark-gray pa3">
    <section className="mw7 center pa4 bg-near-white">
      <Formik
        initialValues={objective}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        validateOnBlur={true}
        validateOnChange={false}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required"),
          keyResults: Yup.array()
            .of(
              Yup.object().shape({
                title: Yup.string()
                  .min(2, "too short")
                  .required("Required"), // these constraints take precedence
                completed: Yup.bool().required("Required")
              })
            )
            .required("Must have at least one")
        })}
      >
        {props => {
          const {
            values,
            // touched,
            errors,
            dirty,
            isSubmitting,
            //handleChange,
            //handleBlur,
            handleSubmit,
            handleReset
          } = props;

          const progress = values.keyResults.length
            ? Math.round(
                (values.keyResults.filter(({ completed }) => completed).length /
                  values.keyResults.length) *
                  100
              )
            : 0;

          return (
            <form onSubmit={handleSubmit}>
              <div className="mb4">
                <h1>Objective</h1>
                <Field name="name" value={values.name} component={Input} />
              </div>

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
                        {values.keyResults.map((keyResult, index) => (
                          <div key={`keyResult-${index}`}>
                            <li className="flex justify-between mb3">
                              <div className={"pa3 flex w-100"}>
                                <Field name={`keyResults.${index}.completed`}>
                                  {({ field, form }) => (
                                    <>
                                      <input
                                        type="checkbox"
                                        className={"mr3"}
                                        {...field}
                                        checked={keyResult.completed}
                                      />

                                      {form.touched[field.name] &&
                                        form.errors[field.name] && (
                                          <div className="error">
                                            {form.errors[field.name]}
                                          </div>
                                        )}
                                    </>
                                  )}
                                </Field>
                                <Field
                                  name={`keyResults.${index}.title`}
                                  value={keyResult.title}
                                  labelName="title"
                                  component={Input}
                                />
                              </div>
                              <button
                                type="button"
                                className="bg-transparent pa0 bn pointer"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <span role="img" aria-label="remove">
                                  ❌
                                </span>
                              </button>
                            </li>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="bg-light-gray pv2 ph3 bn br2"
                          onClick={() =>
                            arrayHelpers.push({ title: "", completed: false })
                          }
                        >
                          Add
                        </button>
                      </div>
                    )}
                  />
                </ul>
              </div>

              <footer className="flex justify-end">
                <button
                  className="bg-gray white pv2 ph5 fw8 br2 bn"
                  type="button"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <button
                  className="bg-gray white pv2 ph5 fw8 br2 bn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </footer>

              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </form>
          );
        }}
      </Formik>
    </section>
  </div>
);
