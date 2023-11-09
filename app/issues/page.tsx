import { Button, Table } from "@radix-ui/themes";
import React from "react";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../ResuseableComponents/IssueStatusBadge";
import Link from "../ResuseableComponents/Link";
// npm install delay for delay fetch data on server
import delay from "delay";
import IssueActions from "./IssueActions";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();
  await delay(2000);
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue </Link>
        </Button>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                {/* {issue.title} */}
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
