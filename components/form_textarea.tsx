import { FormikProps } from 'formik';

type Props = {
    id: string;
    label: string;
    error: string | false | undefined;
    formik: FormikProps<any>;
  };

const FormTextArea = ({ id, label, error, formik }: Props) => {
  return (
    <div className="input-div-style group">
      <textarea
        className="input-peer-style peer"
        placeholder=" "
        rows={2}
        id={id}
        {...formik.getFieldProps(id)}
      />
      <label htmlFor={id} className="input-label-peer-style">
        {label}
      </label>
      {error ? (
        <div className="input-error-style">{error}</div>
      ) : null}
    </div>
  );
};

export default FormTextArea;