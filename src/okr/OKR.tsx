import React, { FC } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Objective } from "../types";
import { KeyResults } from "./KeyResults";
import { ObjectiveComponent } from "./ObjectiveComponent";

interface Props {
  objective: Objective;
  close: () => void;
}

export const OKR: FC<Props> = ({ objective, close }) => (
  <div className="sans-serif dark-gray pa3">
    <button onClick={close}>x</button>
    <section className="mw7 center pa4 bg-near-white">
      <Formik
        initialValues={objective}
        // enableReinitialize={true}
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

          return (
            <form onSubmit={handleSubmit}>
              <ObjectiveComponent objective={values} />

              <KeyResults objective={values} errors={errors} />

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

              {/* <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </form>
          );
        }}
      </Formik>
    </section>
  </div>
);
