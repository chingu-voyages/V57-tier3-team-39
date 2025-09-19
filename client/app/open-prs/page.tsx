"use client";

import { useState } from "react";
import type { PullRequest } from "@/types/pt";
import PullRequestCard from "@/components/OpenPRCard";

export default function OpenPRsPage() {
    const [prs, setPrs] = useState<PullRequest[]>([]);
    const [error, setError] = useState("");

    // Default value to test (owner and repo name)
    const [owner, setOwner] = useState("chingu-voyages");
    const [repo, setRepo] = useState("V57-tier3-team-39");
    const [token, setToken] = useState("");

    const isDisabled = !owner || !repo;


    const fetchPRs = async () => {
        setError("");
        try {
            const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/pulls?state=open`,
                token
                ? { headers: { Authorization: `token ${token}` } }
                : undefined
            );

            if (!res.ok) {
                throw new Error("Invalid repository name");
            }
            const data = await res.json();
            const mapped: PullRequest[] = data.map((pr: any) => ({
                number: pr.number,
                title: pr.title,
                author: pr.user?.login ?? "Unknown",
                createdAt: pr.created_at,
                updatedAt: pr.updated_at,
                requested_reviewers: pr.requested_reviewers?.map((r: any) => r.login) ?? [],
                lastAction: pr.state,
            }));

            setPrs(mapped);
        } catch (err: any) {
            setError(err.message);
            setPrs([]);
        }
    };

    return (
    <>
        <div className="p-3 text-4xl font-bold">Open Pull Requests</div>

        <div className="p-3 text-gray-600">
        Track and manage currently open pull requests awaiting review
        </div>

        <div className="mt-8 mx-4 p-6 shadow-lg rounded-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Repository Settings</h2>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                        Repository Owner
                    </label>
                    <input
                        type="text"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        placeholder="e.g... facebook"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                        Repository Name
                    </label>
                    <input
                        type="text"
                        value={repo}
                        onChange={(e) => setRepo(e.target.value)}
                        placeholder="e.g... react"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                GitHub Personal Access Token (Optional)
                </label>
                <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_..."
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                    onClick={fetchPRs}
                    disabled={isDisabled}
                    className={`px-4 py-2 rounded-md text-white ${
                    isDisabled
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    Fetch Pull Requests
                </button>
            </div>
        </div>

        {/* Display fetch data */}
        <div className="m-8 mx-4 p-6 bg-gray-50 border border-gray-300 rounded-md">
                {error && (
                    <div className="flex justify-center items-center h-32">
                        <p className="text-red-500 text-2xl">{error}</p>
                    </div>
                )}

                {prs.length === 0 && !error ? (
                    <div className="text-gray-600 text-2xl">No open PRs</div>
                ) : (
                    prs.map((pr) => <PullRequestCard key={pr.number} pr={pr} />)
                )}
            </div>
    </>
    );
}
