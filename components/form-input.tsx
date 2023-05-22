import { FormikProps } from "formik";

type Props = {
  id: string;
  label: string;
  error: string | false | undefined;
  formik: FormikProps<any>;
  inline?: boolean;
};

const FormInput = ({ id, label, error, formik, inline }: Props) => {
  return (
    <div
      className={
        inline ? "input-div-inline-style group" : "input-div-style group"
      }
    >
      <input
        className="input-peer-style peer"
        placeholder=" "
        type="text"
        id={id}
        {...formik.getFieldProps(id)}
      />
      <label htmlFor={id} className="input-label-peer-style">
        {label}
      </label>
      {error ? <div className="input-error-style">{error}</div> : null}
    </div>
  );
};

export default FormInput;
