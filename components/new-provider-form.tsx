"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "./form-input";
import FormTextArea from "./form-textarea";
import FormImageInput from "./form-image-input";
// import { useRouter } from "next/navigation";

const NewProviderForm = () => {
  // const router = useRouter();
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      services: "",
      phone: "",
      email: "",
      website: "",
      nostr: "",
      twitter: "",
      instagram: "",
      languages: "",
      description: "",
      profile_photo_file: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      location: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      services: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      phone: Yup.string().max(15, "Must be 15 characters or less"),
      email: Yup.string().email("Invalid email address"),
      website: Yup.string().url("Invalid url address"),
      // nostr: Yup.string(),
      // twitter: Yup.string(),
      // instgram: Yup.string(),
      description: Yup.string().max(500, "Must be 500 characters or less"),
    }),
    onSubmit: async (values) => {
      // 1. Create Provider call
      try {
        const response = await fetch("/api/createProvider", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.status !== 200) {
          console.log("FORM] Error occurred creating provider:", data.error);
          alert(JSON.stringify(data.error));
        } else {
          console.log("FORM] Success - created provider, now uploading profile photo");

          // 2. Upload Profile Photo call
          if (values.profile_photo_file) {
            const userId = data.userId;
            const formData = new FormData();
            formData.append('file', values.profile_photo_file);
            formData.append('userId', userId);

            const photoResponse = await fetch("/api/uploadProfilePhoto", {
              method: "POST",
              body: formData,
            });

            const photoData = await photoResponse.json();
    
            if (photoResponse.status !== 200) {
              console.log("[FOTO] Photo upload error:", photoData.error);
              alert(JSON.stringify(photoData.error));
            } else {
              console.log("[FOTO] Photo uploaded successfully.");
            }
          }
    
          // TODO: Route after successful submission
          console.log("Form submitted successfully. Redirecting...");
          // router.push('/newProvider');
        } 
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form");
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full bg-neutral-300 flex flex-col items-center py-8 mx-auto">
      <h1 className="text-5xl font-semibold text-center text-black">
        Get on the List!
      </h1>
      <form
        className="my-4 flex flex-col p-6 w-full px-16"
        onSubmit={formik.handleSubmit}
      >
        <FormInput
          id="name"
          label="Name"
          error={formik.touched.name && formik.errors.name}
          formik={formik}
        />

        <FormInput
          id="location"
          label="Location"
          error={formik.touched.location && formik.errors.location}
          formik={formik}
        />

        <FormInput
          id="services"
          label="Services"
          error={formik.touched.services && formik.errors.services}
          formik={formik}
        />

        <div className="grid md:grid-cols-2 md:gap-6">
          <FormInput
            id="phone"
            label="Phone"
            error={formik.touched.phone && formik.errors.phone}
            formik={formik}
            inline={true}
          />

          <FormInput
            id="email"
            label="Email"
            error={formik.touched.email && formik.errors.email}
            formik={formik}
            inline={true}
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <FormInput
            id="website"
            label="Website"
            error={formik.touched.website && formik.errors.website}
            formik={formik}
            inline={true}
          />

          <FormInput
            id="nostr"
            label="Nostr"
            error={formik.touched.nostr && formik.errors.nostr}
            formik={formik}
            inline={true}
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <FormInput
            id="twitter"
            label="Twitter"
            error={formik.touched.twitter && formik.errors.twitter}
            formik={formik}
            inline={true}
          />

          <FormInput
            id="instagram"
            label="Instagram"
            error={formik.touched.instagram && formik.errors.instagram}
            formik={formik}
            inline={true}
          />
        </div>

        <FormTextArea
          id="description"
          label="Description"
          error={formik.touched.description && formik.errors.description}
          formik={formik}
        />

        <FormImageInput
          onImageCropped={(croppedImage) =>
            formik.setFieldValue("profile_photo_file", croppedImage)
          }
        />

        {/* <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div> */}

        <button
          className="mt-16 text-lg text-white font-semibold bg-gray-600 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProviderForm;
