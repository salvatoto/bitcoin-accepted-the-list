import React, { useState } from "react";

type Props = {
  onImageCropped?: (croppedImage: string) => void;
};

const FormImageUpload = ({ onImageCropped }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label className="input-label-plain-style">Profile Photo</label>
      <input
        className="input-file-style"
        id="profile_url"
        type="file"
        onChange={handleImagePreview}
      />
      {imagePreview && (
        <img src={imagePreview} alt="Image preview" className="rounded mt-4" />
      )}
    </>
  );
};

export default FormImageUpload;