"use client";

import React, { useEffect, useState, useContext, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "./form-input";
import FormTextArea from "./form-textarea";
import FormImageInput from "./form-image-input";
import { useRouter } from "next/navigation";
import { AlertContext } from "@/contexts/AlertContext";
import { createProvider, uploadProfilePhoto } from "../lib/api/api";

// TODO:
// 1. Add LNUrl
// 3. Also need to add a loading spinner

const NewProviderForm = ({
  updateAlertMessage,
}: {
  updateAlertMessage: (message: string) => void;
}) => {
  const router = useRouter();
  const { setAlertMessage } = useContext(AlertContext);

  // Setup formik form
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
      website: Yup.string().matches(
        /^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)?$|^([^\s/$.?#].[^\s]*)$/,
        "Invalid URL address"
      ),
      nostr: Yup.string(),
      twitter: Yup.string(),
      instgram: Yup.string(),
      description: Yup.string().max(500, "Must be 500 characters or less"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      updateAlertMessage("");
      setSubmitting(true);
    
      try {
        // 1. Create Provider call
        const providerData = await createProvider(values);
    
        console.log(
          "FORM] Success - created provider, now uploading profile photo"
        );
    
        // 2. Upload Profile Photo call
        if (values.profile_photo_file) {
          const userId = providerData.userId;
          const photoData = await uploadProfilePhoto(
            values.profile_photo_file,
            userId
          );
    
          console.log("[FOTO] Photo uploaded successfully.");
          console.log("[FORM] Form submitted successfully. Redirecting...");
    
          // 3. Route upon completion
          router.push("/form-completion");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Manually trigger form submission so we can validate first and scroll to errors + show alert if errors
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        let firstErrorField = Object.keys(errors)[0];
        let firstError = (errors as any)[firstErrorField];

        // Update the alert message
        updateAlertMessage(firstErrorField + ": " + firstError);

        switch (firstErrorField) {
          case "name":
            nameInputRef.current && scrollToElement(nameInputRef.current, -40);
            break;
          case "location":
            locationInputRef.current &&
              scrollToElement(locationInputRef.current, -40);
            break;
          case "services":
            servicesInputRef.current &&
              scrollToElement(servicesInputRef.current, -40);
            break;
        }
      } else {
        // Clear the alert message when there are no form errors
        updateAlertMessage("");
        formik.submitForm();
      }
    });
  };

  // Refs for scrolling to input fields
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const locationInputRef = useRef<HTMLInputElement | null>(null);
  const servicesInputRef = useRef<HTMLInputElement | null>(null);
  const scrollToElement = (element: HTMLElement, offset: number) => {
    const top =
      element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center bg-neutral-300 py-8">
      <h1 className="text-center text-5xl font-semibold text-black">
        Get on the List!
      </h1>

      <form
        className="my-4 flex w-full flex-col p-6 px-16"
        onSubmit={handleSubmit}
      >
        <FormInput
          ref={nameInputRef}
          id="name"
          label="Name"
          error={formik.touched.name && formik.errors.name}
          formik={formik}
        />

        <FormInput
          ref={locationInputRef}
          id="location"
          label="Location"
          error={formik.touched.location && formik.errors.location}
          formik={formik}
        />

        <FormInput
          ref={servicesInputRef}
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
          className="mt-16 rounded-md bg-gray-600 px-6 py-3 text-lg font-semibold text-white focus:outline-none focus:ring-2"
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
