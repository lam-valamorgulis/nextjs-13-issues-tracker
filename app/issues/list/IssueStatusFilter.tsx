// import { Status } from '@prisma/client'
"use client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: string }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSE" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    // redireact to route "?status=foo" => then get param from url => then query to database
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
