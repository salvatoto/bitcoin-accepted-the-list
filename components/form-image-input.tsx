import React, { useState } from "react";
import smartcrop from "smartcrop";

type Props = {
  onImageCropped?: (croppedImage: Blob) => void;
};

const FormImageInput = ({ onImageCropped }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImagePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = async () => {
          const cropResult = await smartcrop.crop(image, {
            width: 200,
            height: 200,
          });
          const { blob, dataUrl } = await cropImage(image, cropResult.topCrop);
          setImagePreview(dataUrl);
          if (onImageCropped) {
            onImageCropped(blob);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // for now use "smartcrop" package to auto-crop
  const cropImage = (
    img: HTMLImageElement,
    cropArea: smartcrop.Crop
  ): Promise<{ blob: Blob; dataUrl: string }> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 200;
      canvas.height = 200;
      ctx?.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        200,
        200
      );

      // Convert the canvas to a blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve({
            blob: blob,
            dataUrl: canvas.toDataURL(),
          });
        } else {
          reject(new Error("Failed to create blob from canvas"));
        }
      }, "image/png");
    });
  };

  return (
    <>
      <label className="input-label-plain-style">Profile Photo</label>
      <input
        className="input-file-style"
        id="profile_photo_file"
        type="file"
        onChange={handleImagePreview}
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image preview"
          className="mt-4 rounded"
          width="200"
          height="200"
        />
      )}
    </>
  );
};

export default FormImageInput;
