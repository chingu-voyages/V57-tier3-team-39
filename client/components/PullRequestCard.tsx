"use client";

import { Card, Text } from "@mantine/core";
import { PullRequest } from "@/types/pr";
import { FaRegCommentDots, FaRegCheckCircle, FaRegEdit } from "react-icons/fa";

interface Props {
  pr: PullRequest;
}

export default function PullRequestCard({ pr }: Props) {
  const actionIcon = () => {
    switch (pr.lastAction) {
      case "open":
        return (
          <FaRegCheckCircle className="inline text-green-500 mx-3 size-6" />
        );
      case "approved":
        return (
          <FaRegCheckCircle className="inline text-green-700 mx-3 size-6" />
        );
      case "commented":
        return (
          <FaRegCommentDots className="inline text-blue-500 mx-3 size-6" />
        );
      case "changes_requested":
        return <FaRegEdit className="inline text-red-500 mx-3 size-6" />;
      default:
        return null;
    }
  };

  const created = pr.createdAt ? new Date(pr.createdAt) : new Date(NaN);
  const createdText = isNaN(created.getTime())
    ? "Unknown"
    : created.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const merged = pr.mergedAt ? new Date(pr.mergedAt) : new Date(NaN);
  const mergedText = isNaN(merged.getTime())
    ? "Unknown"
    : merged.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const isClosedPR = pr.state === "closed";
  const isMergedPR = Boolean(pr.mergedAt);

  const closed = pr.closedAt ? new Date(pr.closedAt) : new Date(NaN);
  const closedText = isNaN(closed.getTime())
    ? "Unknown"
    : closed.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <Card padding="lg" radius={0} className="border-t-2 border-gray-400">
      {/* Mobile design */}
      <div>
        <div className="flex flex-row items-center pb-2 lg:hidden">
          <Text fw={700} size="xl">
            <span
              className="px-2 py-1.5 rounded text-sm text-white shadow-md"
              style={{ backgroundColor: "#805AD5" }}
            >
              #{pr.number}
            </span>
          </Text>

          <div>{actionIcon()}</div>

          <Text fw={700}>
            <a
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block truncate"
            >
              {pr.title}
            </a>
          </Text>
        </div>

        <div
          className="text-md lg:text-lg lg:hidden"
          style={{ color: "#2D3748" }}
        >
          Opened by: @{pr.author ?? "Unknown"} . {createdText}
        </div>

        {!isClosedPR && (
          <div
            className="text-md lg:text-lg lg:hidden"
            style={{ color: "#2D3748" }}
          >
            Last Action: {pr.lastAction} ()
          </div>
        )}

        {isClosedPR && isMergedPR && (
          <div
            className="text-md lg:text-lg lg:hidden"
            style={{ color: "#2D3748" }}
          >
            Merged: {mergedText}
          </div>
        )}

        {isClosedPR && !isMergedPR && (
          <div
            className="text-md lg:text-lg lg:hidden"
            style={{ color: "#2D3748" }}
          >
            Closed without merged: {closedText}
          </div>
        )}

        <div
          className="lg:justify-self-end lg:hidden"
          style={{ color: "#2D3748" }}
        >
          Reviewers:{" "}
          {pr.requested_reviewers && pr.requested_reviewers.length > 0
            ? pr.requested_reviewers.join(", ")
            : "None"}
        </div>
      </div>

      {/* Desktop and Tablet design */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_0.5fr_2fr_2fr] lg:gap-2">
        <Text fw={700} size="xl">
          <span
            className="px-2 py-1.5 rounded text-sm lg:text-lg text-white shadow-md"
            style={{ backgroundColor: "#805AD5" }}
          >
            #{pr.number}
          </span>
        </Text>

        <div>{actionIcon()}</div>

        <div className="lg:mx-auto text-left lg:max-w-lg">
          <Text fw={700}>
            <a
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline lg:text-2xl"
            >
              {pr.title}
            </a>
          </Text>

          <div className="text-md lg:text-lg" style={{ color: "#2D3748" }}>
            Opened by: @{pr.author ?? "Unknown"} . {createdText}
          </div>

          {!isClosedPR && (
            <div className="text-md lg:text-lg" style={{ color: "#2D3748" }}>
              Last Action: {pr.lastAction} ()
            </div>
          )}

          {isClosedPR && isMergedPR && (
            <div className="text-md lg:text-lg" style={{ color: "#2D3748" }}>
              Merged: {mergedText}
            </div>
          )}

          {isClosedPR && !isMergedPR && (
            <div className="text-md lg:text-lg" style={{ color: "#2D3748" }}>
              Closed without merged: {closedText}
            </div>
          )}
        </div>

        <div className="lg:justify-self-end" style={{ color: "#2D3748" }}>
          Reviewers:{" "}
          {pr.requested_reviewers && pr.requested_reviewers.length > 0
            ? pr.requested_reviewers.join(", ")
            : "None"}
        </div>
      </div>
    </Card>
  );
}
