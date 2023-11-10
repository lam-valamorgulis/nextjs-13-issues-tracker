import { z } from "zod";
//  create schemas to validate type
// create a schemas in separate file to migrate with react hook form
// re-use client-validation and request api
const issueSchema = z.object({
  // use message to control user friendly error
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.string().refine(
    (status) => {
      return ["OPEN", "CLOSE", "IN_PROGRESS"].includes(status);
    },
    {
      message: "Status must be one of: OPEN, CLOSE, IN_PROGRESS",
    },
  ),
});

export default issueSchema;
