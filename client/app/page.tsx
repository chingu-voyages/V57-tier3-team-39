import { Button, Card, Text } from "@mantine/core";
import {
  IconArrowRight,
  IconCircleCheckFilled,
  IconClockFilled,
} from "@tabler/icons-react";
import { FaRegHandshake, FaShieldHalved, FaEye } from "react-icons/fa6";
import { FaHistory, FaRegStar } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div style={{ backgroundColor: "#F0E7FF" }}>
          <div
            className="text-white min-h-[884px] pt-[128px] px-[36px]"
            style={{
              backgroundImage: "url('/images/background.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className=" text-4xl font-bold text-center sm:text-left">
              Track Pull Requests Like Never Before!
            </h1>
            <p className="text-white text-lg text-center sm:text-left max-w-lg mt-[64px]">
              Stop losing track of pull requests. Get real-time visibility into
              your team&#39;s PR status, review progress, and merger history -
              all in one beautiful dashboard.
            </p>
            <div className="mt-6 flex justify-center sm:justify-start gap-4 mt-[64px]">
              <Button variant="filled" color="violet">
                View Open PRs
                <span className="ml-2">
                  <IconArrowRight size={18} />
                </span>
              </Button>
            </div>
          </div>

          <div>
            <div className="w-[336px] mx-auto mt-8 mb-8">
              <div className="h-[232px]">
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

              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">
                  Powerful Feature for Better PR Management
                </h2>
                <p className="px-[64px]">
                  Everything you need to keep your team&#39;s PRs moving
                </p>
              </div>
            </div>

            <div className="w-[253px] h-[154px] mx-auto mt-8 mb-8">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h2 className="text-lg font-semibold mb-2">
                  <span className="inline-block mr-2 align-middle">
                    <IconClockFilled size={32} stroke={2} />
                  </span>
                  Real Time Tracking
                </h2>
                <p>
                  Monitor pull request status in real-time with automatic
                  updates from GitHub API
                </p>
              </Card>
            </div>
            <div className="w-[253px] h-[154px] mx-auto mt-8 mb-8">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h2 className="text-lg font-semibold mb-2">
                  <span className="inline-block mr-2 align-middle">
                    <FaRegHandshake size={32} />
                  </span>
                  Team Collaboration
                </h2>
                <p>
                  See who's reviewing what and track team member contributions
                  at a glance
                </p>
              </Card>
            </div>
            <div className="w-[253px] h-[154px] mx-auto mt-8 mb-8">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h2 className="text-lg font-semibold mb-2">
                  <span className="inline-block mr-2 align-middle">
                    <FaHistory size={32} />
                  </span>
                  Historical Data
                </h2>
                <p>
                  Access complete history of closed and merged pull request for
                  analysis
                </p>
              </Card>
            </div>
            <div className="w-[253px] h-[154px] mx-auto mt-8 mb-8">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h2 className="text-lg font-semibold mb-2">
                  <span className="inline-block mr-2 align-middle">
                    <FaRegStar size={32} />
                  </span>
                  Smart Filtering
                </h2>
                <p>
                  Filter PRs by author, reviewer, or status to find what you
                  need quickly
                </p>
              </Card>
            </div>
            <div className="w-[253px] h-[154px] mx-auto mt-8 mb-8">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h2 className="text-lg font-semibold mb-2">
                  <span className="inline-block mr-2 align-middle">
                    <FaShieldHalved size={32} />
                  </span>
                  Secure Access
                </h2>
                <p>
                  Use personal access tokens for secure API access with higher
                  rate limits
                </p>
              </Card>
            </div>
            <div className="w-[253px] h-[154px] mx-auto mt-8 mb-8">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h2 className="text-lg font-semibold mb-2">
                  <span className="inline-block mr-2 align-middle">
                    <FaEye size={32} />
                  </span>
                  Comprehensive View
                </h2>
                <p>
                  View PR details, labels, reviewers, and activity all in one
                  place
                </p>
              </Card>
            </div>

            <div className="w-[336px] mx-auto mt-8 mb-8">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h2 className="text-lg font-semibold mb-2">
                  Ready to Streamline Your PR Process?
                </h2>
                <p>
                  Start tracking your team's pull requests today. No
                  installation required - just enter your repository details and
                  go!
                </p>
                <div className="flex justify-center sm:justify-start mt-4">
                  <Button variant="filled" color="violet">
                    Get Started Now
                    <span className="ml-2">
                      <IconArrowRight size={18} />
                    </span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
