import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  // fetch data direct in database
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  // issue form will be resuse in update and create new issues
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
