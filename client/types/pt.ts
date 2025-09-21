export interface PullRequest {
    number: number;
    title: string;
    author: string;
    requested_reviewers: string[];
    createdAt: string;
    lastAction: string;
    updatedAt: string;
    url: string;
}
