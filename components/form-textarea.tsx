import { FormikProps } from "formik";

type Props = {
  id: string;
  label: string;
  error: string | false | undefined;
  formik: FormikProps<any>;
};

const FormTextArea = ({ id, label, error, formik }: Props) => {
  return (
    <div className="group relative z-0 mb-12 w-full">
      <textarea
        className="textarea-peer-style peer"
        placeholder=" "
        rows={6}
        id={id}
        {...formik.getFieldProps(id)}
      />
      <label htmlFor={id} className="textarea-label-peer-style">
        {label}
      </label>
      {error ? <div className="input-error-style">{error}</div> : null}
    </div>
  );
};

export default FormTextArea;
