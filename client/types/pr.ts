export interface PullRequest {
    number: number;
    title: string;
    author: string;
    requested_reviewers: string[];
    createdAt: string;
    lastAction: string;
    updatedAt: string;
    url: string;
    mergedAt?: string;
    closedAt?: string;
    state?: string; // "open" or "closed"
}
