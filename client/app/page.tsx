"use client";

import { Button, Card, Text } from "@mantine/core";
import {
  IconArrowRight,
  IconCircleCheckFilled,
  IconClockFilled,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handlePRpage = () => {
    router.push("/open-prs");
  }

  return (
    <div className="flex justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Track Pull Requests Like Never Before
          </h1>
          <p className="text-lg text-center sm:text-left max-w-lg mt-4">
            Stop losing track of pull requests. Get real-time visibility into
            your team&#39;s PR status, review progress, and merger history - all
            in one beautiful dashboard.
          </p>
          <div className="flex gap-4 flex-col mt-4">
            <Button variant="default" onClick={handlePRpage}>
              View Open PRs
              <span>
                <IconArrowRight size={18} />
              </span>
            </Button>
            <Button variant="default">Browse History</Button>
          </div>
        </div>

        <div>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <h2 className="text-lg font-semibold mb-2">
              Why Use PR Status Board?
            </h2>
            <ol>
              <li>
                <Text className="flex items-center gap-2">
                  <span>
                    <IconCircleCheckFilled size={32} stroke={2} />
                  </span>
                  Reduce PR review wait times
                </Text>
              </li>
              <li>
                <Text className="flex items-center gap-2">
                  <span>
                    <IconCircleCheckFilled size={32} stroke={2} />
                  </span>
                  Track project progress
                </Text>
              </li>
              <li>
                <Text className="flex items-center gap-2">
                  <span>
                    <IconCircleCheckFilled size={32} stroke={2} />
                  </span>
                  Improve team collaboration
                </Text>
              </li>
              <li>
                <Text className="flex items-center gap-2">
                  <span>
                    <IconCircleCheckFilled size={32} stroke={2} />
                  </span>
                  Identify bottlenecks quickly
                </Text>
              </li>
            </ol>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Powerful Feature for Better PR Management
          </h2>
          <p>Everything you need to keep your team&#39;s PRs moving</p>
        </div>

        <div>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <h2 className="text-lg font-semibold mb-2">
              <span className="inline-block mr-2 align-middle">
                <IconClockFilled size={32} stroke={2} /> {/* filled */}
              </span>
              Real Time Tracking
            </h2>
            <p>
              Monitor pull request status in real-time with automatic updates
              from GitHub API
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
