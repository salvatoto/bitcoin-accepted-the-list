import React from "react";

interface Props {
  id: string;
  imageUrl: string;
  error: string | false | undefined;
  formik: any;
}

const FormToggle = React.forwardRef<HTMLInputElement, Props>(
  ({ id, imageUrl, formik }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      formik.setFieldValue(id, checked);
    };

    return (
      <div className="group relative z-0 m-2 flex w-full justify-center">
        <label className="relative m-2 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={formik.values[id]}
            {...formik.getFieldProps(id)}
            onChange={handleChange}
          />
          <div className="toggle-switch-style peer"></div>
          <img
            className="ml-2 h-10 w-20 flex-shrink-0 md:ml-4 md:h-40 md:w-80"
            src={imageUrl}
            alt="Bitcoin Accepted Here"
          />
        </label>
      </div>
    );
  }
);

export default FormToggle;
