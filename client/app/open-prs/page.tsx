"use client";
import { useAtom } from "jotai";
import {
  openPRsAtom,
  openErrorAtom,
  openPageAtom,
  ownerAtom,
  repoAtom,
  tokenAtom,
} from "@/atoms/prAtoms";
import RepoSettingsForm from "@/components/form/RepoSettingForm";
import PullRequestCard from "@/components/PullRequestCard";
import Pagination from "@/components/button/Pagination";
import type { PullRequest } from "@/types/pr";
import { Text } from "@mantine/core";

export default function OpenPRsPage() {
  const [prs, setPrs] = useAtom(openPRsAtom);
  const [error, setError] = useAtom(openErrorAtom);
  const [page] = useAtom(openPageAtom);
  const [owner] = useAtom(ownerAtom);
  const [repo] = useAtom(repoAtom);
  const [token] = useAtom(tokenAtom);

  const PAGE_SIZE = 3;
  const paginatedPRs = prs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const fetchPRs = async () => {
    setError("");
    try {
      const res = await fetch(
        `/api/openPR?owner=${owner}&repo=${repo}&token=${token}`
      );
      if (!res.ok) throw new Error("Invalid repository name");

      const data = await res.json();

      const mapped: PullRequest[] = data.map((pr: any) => ({
        number: pr.number,
        title: pr.title,
        author: pr.author ?? pr.user?.login ?? "Unknown",
        createdAt: pr.createdAt ?? pr.created_at ?? "",
        updatedAt: pr.updatedAt ?? pr.updated_at ?? "",
        requested_reviewers: pr.requested_reviewers ?? [],
        lastAction: pr.lastAction ?? "open",
        url: pr.url ?? pr.html_url ?? "",
      }));

      setPrs(mapped);
    } catch (err: any) {
      setError(err.message);
      setPrs([]);
    }
  };

  return (
    <div>
      <h1 className="p-3 text-4xl font-bold text-center">Open Pull Requests</h1>
      <RepoSettingsForm onFetch={fetchPRs} />

      <div className="m-8 mx-4 p-1 border border-gray-300 bg-white lg:max-w-4xl lg:mx-auto">
        {/* Display error */}
        {error && (
          <div className="flex justify-center items-center h-32">
            <p className="text-red-500 text-2xl">{error}</p>
          </div>
        )}

        {/* PR display header */}
        {paginatedPRs.length > 0 && (
          <div className="pl-6">
            <Text size="xl" fw={700}>
              PR Display
            </Text>
          </div>
        )}

        {/* If PR not found */}
        {paginatedPRs.length === 0 && !error ? (
          <div className="text-gray-600 text-2xl">No open PRs</div>
        ) : (
          // Display each PR
          paginatedPRs.map((pr) => <PullRequestCard key={pr.number} pr={pr} />)
        )}
      </div>

      <Pagination pageAtom={openPageAtom} prsAtom={openPRsAtom} />
    </div>
  );
}
