import { FormikProps } from 'formik';

type Props = {
    id: string;
    label: string;
    error: string | false | undefined;
    formik: FormikProps<any>;
  };

const FormInput = ({ id, label, error, formik }: Props) => {
  return (
    <div className="input-div-style group">
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
      {error ? (
        <div className="input-error-style">{error}</div>
      ) : null}
    </div>
  );
};

export default FormInput;