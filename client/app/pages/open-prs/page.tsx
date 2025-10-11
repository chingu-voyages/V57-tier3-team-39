"use client";
import { useAtom } from "jotai";
import { useState, useMemo } from "react";
import { LoadingOverlay } from "@mantine/core";
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
import { Text, Box } from "@mantine/core";

export default function OpenPRsPage() {
  const [prs, setPrs] = useAtom(openPRsAtom);
  const [error, setError] = useAtom(openErrorAtom);
  const [page] = useAtom(openPageAtom);
  const [owner] = useAtom(ownerAtom);
  const [repo] = useAtom(repoAtom);
  const [token] = useAtom(tokenAtom);

  const [limit, setLimit] = useState<number | null>(5);
  const [loading, setLoading] = useState(false);

  // filter state
  const [filterAuthor, setFilterAuthor] = useState<string>("");
  const [filterReviewer, setFilterReviewer] = useState<string>("");
  const [filterStartDate, setFilterStartDate] = useState<string>("");
  const [filterEndDate, setFilterEndDate] = useState<string>("");

  // sort state
  const [sortBy, setSortBy] = useState<"recency" | "activity">("recency");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // filter function
  const applyFilters = (prList: PullRequest[]): PullRequest[] => {
    return prList.filter((pr) => {
      const matchAuthor = !filterAuthor || pr.author === filterAuthor;
      const matchReviewer = !filterReviewer || pr.requested_reviewers.includes(filterReviewer);
      
      const matchStartDate = !filterStartDate || new Date(pr.createdAt) >= new Date(filterStartDate);
      const matchEndDate = !filterEndDate || new Date(pr.createdAt) <= new Date(filterEndDate);
      
      return matchAuthor && matchReviewer && matchStartDate && matchEndDate;
    });
  };

  // sort function
  const applySort = (prList: PullRequest[]): PullRequest[] => {
    return [...prList].sort((a, b) => {
      if (sortBy === "recency") {
        const diff = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        return sortOrder === "asc" ? diff : -diff;
      } else if (sortBy === "activity") {
        const activityA = new Date(a.lastAction).getTime();
        const activityB = new Date(b.lastAction).getTime();
        return sortOrder === "asc" ? activityA - activityB : activityB - activityA;
      }
      return 0;
    });
  };

  const filteredPRs = useMemo(() => {
    return applySort(applyFilters(prs));
  }, [prs, filterAuthor, filterReviewer, filterStartDate, filterEndDate, sortBy, sortOrder]);

  const clearFilters = () => {
    setFilterAuthor("");
    setFilterReviewer("");
    setFilterStartDate("");
    setFilterEndDate("");
  };

  const PAGE_SIZE = 3;
  const paginatedPRs = filteredPRs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const fetchPRs = async () => {
    setLoading(true);
    setError("");
    try {
      const tokenParam = token && token.trim() !== "" ? `&token=${token}` : "";
      const res = await fetch(
        `/api/openPR?owner=${owner}&repo=${repo}${tokenParam}&limit=${limit}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "🚨 Unable to fetch pull requests.");
      }

      const prsData: PullRequest[] = data.prs || [];
      
      setPrs(prsData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("🚨 Unable to fetch pull requests.");
      }
      setPrs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow">
      <h1
        className="p-3 text-4xl font-bold text-center mt-6"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Open Pull Requests
      </h1>
      <RepoSettingsForm 
        onFetch={fetchPRs} 
        prs={prs}
        filterAuthor={filterAuthor}
        setFilterAuthor={setFilterAuthor}
        filterReviewer={filterReviewer}
        setFilterReviewer={setFilterReviewer}
        filterStartDate={filterStartDate}
        setFilterStartDate={setFilterStartDate}
        filterEndDate={filterEndDate}
        setFilterEndDate={setFilterEndDate}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        clearFilters={clearFilters}
      />

      <div className="flex justify-center items-center gap-2 my-4">
        <label className="font-medium text-gray-800">Max PRs:</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={limit === null ? "" : limit}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              if (value === "" || Number(value) === 0) {
                setLimit(0);
              } else {
                setLimit(Number(value));
              }
            }
          }}
          className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-gray-900 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none w-20"
        />
      </div>

      <div className="m-8 mx-4 p-1 border border-gray-300 bg-white lg:max-w-4xl lg:mx-auto">
        {error && (
          <div className="flex flex-col justify-center items-center h-48 gap-4 text-center">
            <p className="text-red-500 text-2xl">{error}</p>
            <button
              onClick={fetchPRs}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700"
            >
              Retry
            </button>
          </div>
        )}

        {paginatedPRs.length > 0 && (
          <div className="pl-6">
            <Text size="xl" fw={700}>
              PR Display
            </Text>
          </div>
        )}

        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "purple", type: "bars" }}
          />

          {filteredPRs.length === 0 && prs.length > 0 && !error ? (
            <div
              className="text-gray-600 text-2xl text-center p-8"
              role="status"
              aria-live="polite"
            >
              No PRs found for this filter
            </div>
          ) : paginatedPRs.length === 0 && !error ? (
            <div
              className="text-gray-600 text-2xl text-center p-8"
              role="status"
              aria-live="polite"
            >
              🎉 No open pull requests right now
            </div>
          ) : (
            paginatedPRs.map((pr) => <PullRequestCard key={pr.number} pr={pr} />)
          )}
        </Box>
      </div>

      {filteredPRs.length > 0 && (
        <Pagination pageAtom={openPageAtom} prsAtom={openPRsAtom} />
      )}
    </div>
  );
}
