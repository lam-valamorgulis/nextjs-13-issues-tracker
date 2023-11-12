import { NextRequest, NextResponse } from "next/server";
import issueSchema from "@/app/schemaValidation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

//receive 2 parameter , request, from next request and params from url
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  // request to get data from body
  const body = await request.json();
  console.log(body);
  //validation from getting data if it match the type of schemas
  const validation = issueSchema.safeParse(body);
  // 1 check validation, 2 check if validate of param
  // 2 get data
  // 3 update data
  if (!validation.success)
    // structure of resp of API : status, message
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,

  { params }: { params: { id: string } },
) {
  // secure api
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
