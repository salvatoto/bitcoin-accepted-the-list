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
import FormToggle from "./form-toggle";

// TODO:
// 0. Change "Bitcoin Accepted Here" logo to orange when checked
// 1. Add LNUrl field
// 2. Add Languages field
// 3. Add preview on Submit
// 4. Hide some fields initially? It's overwhelming

// 5. Remove top alert when input is fixed, or simply when user re-blurs that field. This probably requires added hooks to `onChange` or `onBlur` in FormInput (and the the form elemeents), to then call `validateForm()` in this component.

const NewProviderForm = ({
  updateAlertMessage,
}: {
  updateAlertMessage: (message: string) => void;
}) => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
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
      payments_accepted: true,
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
      payments_accepted: Yup.boolean().oneOf([true], "Don't Shitcoin."),
      description: Yup.string().max(500, "Must be 500 characters or less"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      updateAlertMessage("");
      setSubmitting(true);

      try {
        // 1. Create Provider call
        const providerData = await createProvider(values);
        console.log(
          "FORM] Success - created provider, now uploading profile photo:",
          values.profile_photo_file
        );

        // 2. Upload Profile Photo call (if there is one)
        if (values.profile_photo_file) {
          console.log("[FOTO] sending photo");
          const userId = providerData.userId;
          const photoData = await uploadProfilePhoto(
            values.profile_photo_file,
            userId
          );
          console.log("[FOTO] Photo uploaded successfully.");
        }
        console.log("[FORM] Form submitted successfully. Redirecting...");
      } catch (error) {
        console.error("FORM] Error submitting form:", error);
        alert("An error occurred while submitting the form");
      } finally {
        // 3. Route upon completion
        router.push("/form-completion");
        setSubmitting(false);
        setProgress(100);
      }
    },
  });

  // Manul form validation so we can validate first before formik and scroll to errors + show alert if errors
  const validateForm = async () => {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      let firstErrorField = Object.keys(errors)[0];
      let firstError = (errors as any)[firstErrorField];

      // Update the alert message
      updateAlertMessage(`ERROR: ${firstErrorField} - "${firstError}"`);

      // And scroll to each error field
      // TODO: Add the remaining fields
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
      return false;
    } else {
      updateAlertMessage("");
      return true;
    }
  };

  // Manually trigger form submission so we can validate first before formik and scroll to errors + show alert if errors
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await validateForm()) {
      formik.submitForm();
    }
  };

  // Refs for scrolling to input fields
  // TODO: Add the remaining fields here as well
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const locationInputRef = useRef<HTMLInputElement | null>(null);
  const servicesInputRef = useRef<HTMLInputElement | null>(null);
  const scrollToElement = (element: HTMLElement, offset: number) => {
    const top =
      element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Progress bar for Submit button
  useEffect(() => {
    if (formik.isSubmitting) {
      setProgress(0);

      // After a timeout, set the progress to 80%
      const timeoutId = setTimeout(() => {
        setProgress(90);
      }, 100); // You can adjust the time here

      return () => clearTimeout(timeoutId);
    }
  }, [formik.isSubmitting]);

  return (
    <div className="mx-auto flex w-full flex-col items-center bg-neutral-300 py-8">
      <h1 className="text-center md:text-5xl text-4xl font-semibold text-black">
        Get on the List!
      </h1>

      <form
        className="my-4 flex w-full flex-col p-6 px-8 md:px-16"
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

        <label htmlFor="payments-accepted" className="input-label-plain-style">
          Payments Accepted
        </label>
        <div className=" mb-8 rounded border-2 border-gray-600 bg-white p-4 shadow">
          <FormToggle
            id="payments_accepted"
            imageUrl="/bitcoin_accepted_black.png"
            error={
              formik.touched.payments_accepted &&
              formik.errors.payments_accepted
            }
            formik={formik}
          />
        </div>

        <FormImageInput
          onImageCropped={(croppedImage) =>
            formik.setFieldValue("profile_photo_file", croppedImage)
          }
        />

        <div className="relative mt-16 inline-block overflow-hidden rounded-md bg-gray-700 px-6 py-3 text-lg font-semibold text-white focus:outline-none focus:ring-2">
          <button
            className="relative z-10 flex w-full items-center justify-center"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
          <div
            className="absolute left-0 top-0 h-full bg-orange-600"
            style={{ width: `${progress}%`, transition: "width 2s ease" }}
          ></div>
        </div>
      </form>
    </div>
  );
};

export default NewProviderForm;
