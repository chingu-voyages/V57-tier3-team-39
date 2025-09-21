"use client";

import { Card, Text } from "@mantine/core";
import { PullRequest } from "@/types/pt";

interface Props {
    pr: PullRequest;
}

export default function PullRequestCard({ pr }: Props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
                <Text fw={700} size="lg">
                    <span className="bg-gray-200 px-1 rounded">#{pr.number}</span>{" "}
                    <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        >
                        {pr.title}
                    </a>
                </Text>

                <Text size="sm" c="dimmed">
                    Opened by: {pr.author} on{" "}
                    {new Date(pr.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </Text>

                <Text size="sm" c="dimmed">
                    Last Action: {pr.lastAction} ()
                </Text>
            </div>

            <Text size="sm" c="dimmed" className="mt-2 md:mt-0">
                Reviewers: {pr.requested_reviewers.length > 0
                ? pr.requested_reviewers.join(", ")
                : "None"}
            </Text>
        </div>
    </Card>
  );
}
