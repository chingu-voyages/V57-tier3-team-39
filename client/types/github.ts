export interface GitHubPR {
    number: number;
    title: string;
    user: { login: string };
    created_at: string;
    updated_at: string;
    requested_reviewers: { login: string }[];
    html_url: string;
    merged_at?: string;
    closed_at?: string;
    state?: string; // "open" or "closed"
}

export interface GitHubReview {
    state: string;
}

export interface GitHubComment {}