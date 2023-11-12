import React from "react";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Issue } from "@prisma/client";
import IssueStatusBadge from "@/app/ResuseableComponents/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

// object issue destructure , inline type
const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-4" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};
export default IssueDetails;
