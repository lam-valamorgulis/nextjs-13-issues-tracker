// [id] folder for dynamic router
// this page should only has a responsiblity that control grid layout => seperate another component
// when wanna change the layout it is easy to maintain or move code
import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

// import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Box, Grid, Flex } from "@radix-ui/themes";
import delay from "delay";

interface Props {
  params: { id: string };
}

export default async function IssueDetail({ params }: Props) {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  await delay(2000);
  if (!issue) notFound();

  return (
    // phone 1 col, laptop: 2 col
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}

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
