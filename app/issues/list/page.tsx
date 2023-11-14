import React from "react";
import prisma from "@/prisma/client";
// npm install delay for delay fetch data on server
import delay from "delay";
import Pagination from "@/app/ResuseableComponents/Pagination";
import IssueTable from "./IssueTable";


export default async function IssuesPage({ searchParams }: Props) {
  //https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  const statuses = ["OPEN", "IN_PROGRESS", "CLOSE"];
  const sortStatus = ["title", "status", "createdAt"];

  // pagination declare
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = sortStatus.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const where = { status };
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  // query data with query key to database
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

  await delay(2000);
  return (
    <div>
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
}
export const dynamic = "force-dynamic";
