import React from "react";
import { Badge } from "@radix-ui/themes";

type IssueStatus = "OPEN" | "CLOSE" | "IN_PROGRESS";
interface IssueProps {
  status: IssueStatus;
}

const IssueStatusBadge = ({ status }: IssueProps) => {
  let color;
  switch (status) {
    case "OPEN":
      color = "green";
      break;
    case "CLOSE":
      color = "red";
      break;
    case "violet":
      color = "violet";
  }
  return <Badge color={color}>{status}</Badge>;
};

export default IssueStatusBadge;
