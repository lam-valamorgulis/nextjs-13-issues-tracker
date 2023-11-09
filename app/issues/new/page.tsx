"use client";
// due to form is can only interact fron client side and have to be on very top of component
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import React, { useState } from "react";
import { TextField, Button, Callout } from "@radix-ui/themes";
//https://nextjs.org/docs/app/api-reference/functions/use-router
import { useRouter } from "next/navigation";
// simple markdown component
// import SimpleMDE from "react-simplemde-editor";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { z } from "zod";
//Hook-Based: React Hook Form leverages React's hooks, such as useState, useEffect, and useRef, to manage form state and validation logic. This makes it easy to integrate with functional components and provides a cleaner and more concise syntax.
import { useForm, Controller } from "react-hook-form";
//React Hook Form has made it easy to integrate with external UI component libraries. If the component doesn't expose input's ref, then you should use the Controller component, which will take care of the registration process.

//npm install @hookform/resolvers
//migrate another validation schemas to react-hook form
import { zodResolver } from "@hookform/resolvers/zod";

import createIssueSchema from "@/app/schemaValidation";
import ErrorMessage from "@/app/ResuseableComponents/ErrorMessage";
import Spinner from "@/app/ResuseableComponents/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// define a schemas of form
type IssueForm = z.infer<typeof createIssueSchema>;
export default function NewIssuePage() {
  //The useRouter hook allows you to programmatically change routes
  //inside Client Components.
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  // how to handle error form submit: ??
  // error handling normal form submit (post request) :
  // this form can be valitaion on client side, but with regiter form need to validation form backend
  // ==> using the the error throw from nextresponse error to inform user
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    // HOW TO INFORM A ERROR WHEN USER DONT FILL FORM TO SUBMIT
    // callout A short message to attract user's attention.
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-2" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {/* validation field */}
        {/* how to optimize this code it repetitive ?*/}
        {/* {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )} */}

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* create a hidden field with defaul value for status OPEN (due to to cant create in database) */}
        <VisuallyHidden.Root>
          <TextField.Root>
            <TextField.Input
              value="OPEN"
              placeholder="Status"
              {...register("status")}
            />
          </TextField.Root>
        </VisuallyHidden.Root>
        {/* react Hook Form has made it easy to integrate with external UI component libraries. 
If the component doesn't expose input's ref, then you should use the Controller component, which will take care of the registration process. */}
        {/* This library embraces uncontrolled components and
         native HTML inputs. However, 
         it's hard to avoid working with external controlled components 
         such as React-Select, AntD and MUI. 
         To make this simple, we provide a wrapper component, 
         Controller, to streamline the integration process 
         while still giving you the freedom to use a custom register.*/}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {/* this code repeat need to optimize */}
        {/* {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )} */}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

// -Note:
// -Handling form submit :
// + create form and handlesubmit: react-hook-form
// + handle error: error fetch API, clientside-validation, avoiding submit 2 times
// + handle error: client-side validation
// react hook form :
// + client validation with intergrate with other libraries
// + auto get name and value when submit form
// One of the key concepts in React Hook Form is to
//register your component into the hook.
//This will make its value available for both the form validation and submission.
