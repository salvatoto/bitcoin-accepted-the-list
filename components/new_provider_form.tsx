"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "./form_input";
import FormTextArea from "./form_textarea";
// import { useRouter } from "next/navigation";

const NewProvider = () => {
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
          console.log("FORM] Error occurred:", data.error);
          alert(JSON.stringify(data.error));
        } else {
          console.log("FORM] Form submitted successfully. Redirecting...");
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
<div className="h-screen w-3/5 bg-black flex flex-col justify-center items-center">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-white">
          Get on the list!
        </h1>
        <form className="mt-2 flex flex-col p-6" onSubmit={formik.handleSubmit}>
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

          <FormInput
            id="phone"
            label="Phone"
            error={formik.touched.phone && formik.errors.phone}
            formik={formik}
          />

          <FormInput
            id="email"
            label="Email"
            error={formik.touched.email && formik.errors.email}
            formik={formik}
          />

          <FormInput
            id="website"
            label="Website"
            error={formik.touched.website && formik.errors.website}
            formik={formik}
          />

          <FormInput
            id="nostr"
            label="Nostr"
            error={formik.touched.nostr && formik.errors.nostr}
            formik={formik}
          />

          <FormInput
            id="twitter"
            label="Twitter"
            error={formik.touched.twitter && formik.errors.twitter}
            formik={formik}
          />

          <FormInput
            id="instagram"
            label="Instagram"
            error={formik.touched.instagram && formik.errors.instagram}
            formik={formik}
          />

          <FormTextArea
            id="description"
            label="Description"
            error={formik.touched.description && formik.errors.description}
            formik={formik}
          />

          <label className="input-label-plain-style">Profile Photo</label>
          <input className="input-file-style" id="profile_url" type="file" />
          {/* <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div> */}

          <button
            className="mt-10 text-lg text-white font-semibold bg-gray-600 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    // )}
    // </Formik>
  );
};

export default NewProvider;
