"use client";
import { useAtom } from "jotai";
import { ownerAtom, repoAtom, tokenAtom } from "@/atoms/prAtoms";
import { Text } from "@mantine/core";
import type { PullRequest } from "@/types/pr";
import { savePRsAsJSON } from "@/lib/downloadPRs";
import { useState } from "react";
import { Info, X, Search } from "lucide-react";

interface Props {
  onFetch: () => void;
  prs: PullRequest[];
  filterAuthor: string;
  setFilterAuthor: (value: string) => void;
  filterReviewer: string;
  setFilterReviewer: (value: string) => void;
  filterStartDate: string;
  setFilterStartDate: (value: string) => void;
  filterEndDate: string;
  setFilterEndDate: (value: string) => void;
  sortBy: "recency" | "activity";
  setSortBy: (value: "recency" | "activity") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  clearFilters: () => void;
}

export default function RepoSettingsForm({ 
  onFetch, 
  prs,
  filterAuthor,
  setFilterAuthor,
  filterReviewer,
  setFilterReviewer,
  filterStartDate,
  setFilterStartDate,
  filterEndDate,
  setFilterEndDate,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  clearFilters
}: Props) {
  const [owner, setOwner] = useAtom(ownerAtom);
  const [repo, setRepo] = useAtom(repoAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [showInfo, setShowInfo] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const isDisabled = !owner || !repo;

  const availableAuthors = Array.from(new Set(prs.map(pr => pr.author))).filter(Boolean).sort();
  const availableReviewers = Array.from(
    new Set(prs.flatMap(pr => pr.requested_reviewers))
  ).filter(Boolean).sort();

  const hasActiveFilters = filterAuthor || filterReviewer || filterStartDate || filterEndDate;

  return (
    <div className="mt-8 mx-4 p-6 shadow-lg rounded-lg bg-white lg:max-w-4xl lg:mx-auto">
      <h2 className="text-xl font-bold mb-4">Repository Settings</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Text component="label" size="lg" className="block font-medium mb-1">
            Repository Owner
          </Text>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="GitHub username or org (e.g. vercel)"
            style={{ fontSize: "20px" }}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex-1">
          <Text component="label" size="lg" className="block font-medium mb-1">
            Repository Name
          </Text>
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="Repository name (e.g. blog-platform)"
            style={{ fontSize: "20px" }}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <Text component="label" size="lg" className="block font-medium mb-1">
            GitHub Personal Access Token (Optional)
          </Text>

          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
            aria-label="More info about token"
          >
            <Info size={16} />
          </button>
        </div>

        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Optional: ghp_youraccesstoken"
          style={{ fontSize: "20px" }}
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
        />

        {showInfo && (
          <p className="mt-2 text-lg text-gray-700 bg-purple-50 p-3 rounded-md border border-purple-200">
            💡 A GitHub personal access token increases API rate limits from{" "}
            <strong>60</strong> to <strong>5,000</strong> requests per hour.
            <br />
            Create one at:{" "}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline"
            >
              github.com/settings/tokens
            </a>
          </p>
        )}

      </div>

      {/* Filter and Sort */}
      {prs.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 font-medium transition-colors"
          >
            <Search size={18} />
            {showFilters ? "Hide Filters & Sort" : "Show Filters & Sort"}
          </button>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <Text size="lg" fw={600}>Filters</Text>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                    >
                      <X size={14} />
                      Clear Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Author Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <select
                      value={filterAuthor}
                      onChange={(e) => setFilterAuthor(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                    >
                      <option value="">All Authors</option>
                      {availableAuthors.map((author) => (
                        <option key={author} value={author}>
                          {author}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reviewer Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Reviewer</label>
                    <select
                      value={filterReviewer}
                      onChange={(e) => setFilterReviewer(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                    >
                      <option value="">All Reviewers</option>
                      {availableReviewers.map((reviewer) => (
                        <option key={reviewer} value={reviewer}>
                          {reviewer}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Start Date Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      value={filterStartDate}
                      onChange={(e) => setFilterStartDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                    />
                  </div>

                  {/* End Date Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      value={filterEndDate}
                      onChange={(e) => setFilterEndDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* sort section */}
              <div className="pt-4 border-t border-gray-200">
                <Text size="lg" fw={600} className="mb-3">Sort</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "recency" | "activity")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                    >
                      <option value="recency">Recency (Updated Date)</option>
                      <option value="activity">Activity Level (Last Action)</option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                    >
                      <option value="desc">
                        {sortBy === "recency" ? "Newest First" : "Most Active First"}
                      </option>
                      <option value="asc">
                        {sortBy === "recency" ? "Oldest First" : "Least Active First"}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onFetch}
          disabled={isDisabled}
          style={{ fontSize: "20px", backgroundColor: isDisabled ? "#D6BCFA" : "#805AD5" }}
          className={`px-4 py-2 rounded-md text-white cursor-pointer ${
            isDisabled ? "cursor-not-allowed" : "hover:brightness-90"
          }`}
        >
            Fetch Pull Requests
        </button>

        <button 
          onClick={() => savePRsAsJSON(prs)}
          disabled={prs.length === 0}
          className={`px-4 py-2 rounded-md text-white ${
            prs.length === 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Save PRs as JSON
        </button> 
      </div>
    </div>
  );
}
