// [id] folder for dynamic router
// this page should only has a responsiblity that control grid layout => seperate another component
// when wanna change the layout it is easy to maintain or move code
import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";

// import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";

interface Props {
  params: { id: string };
}

export default async function IssueDetail({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  await delay(2000);
  if (!issue) notFound();

  return (
    // phone 1 col, laptop: 2 col
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>

      {/* <Heading>{issue.title}</Heading>
      <Flex className="space-x-4" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card> */}
    </Grid>
  );
}
