import React from "react";
import { Button, Table, Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueStatusBadge from "@/app/ResuseableComponents/IssueStatusBadge";
import Link from "@/app/ResuseableComponents/Link";
import NextLink from "next/link";
import { Issue } from "@prisma/client";

// import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: "OPEN" | "IN_PROGRESS" | "CLOSED" };
  issues: Issue[];
}
const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <>
      <Flex mb="5" justify="between">
        <IssueStatusFilter />
        <IssueActions />
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: "title" },
                }}
              >
                Issue
                {/* {"title" === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )} */}
              </NextLink>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: "status" },
                }}
              >
                Status
                {/* {"status" === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )} */}
              </NextLink>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: "createdAt" },
                }}
              >
                Created
                {/* {"createdAt" === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )} */}
              </NextLink>
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
    </>
  );
};
export default IssueTable;
