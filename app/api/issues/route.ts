import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
import prisma from "@/prisma/client";
import createIssueSchema from "@/app/schemaValidation";

// ****** move code to sepreate file that can be re-use for client validation ******
//  create schemas to validate type
// const createIssueSchema = z.object({
//   // use message to control user friendly error
//   title: z.string().min(1, { message: "This title is required" }).max(255),
//   description: z.string().min(1, { message: "This description is required" }),
//   status: z.string().refine(
//     (status) => {
//       return ["OPEN", "CLOSE", "IN_PROGRESS"].includes(status);
//     },
//     {
//       message: "Status must be one of: OPEN, CLOSE, IN_PROGRESS",
//     },
//   ),
// });

// api route : api/issues : POST method extend NextRequest
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

//  POST method
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Create
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
