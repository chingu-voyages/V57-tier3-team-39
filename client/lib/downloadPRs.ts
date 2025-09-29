import type { PullRequest } from "@/types/pr";

export function savePRsAsJSON(prs: PullRequest[], filename = "pull_requests_list.json") {
  if (!prs || prs.length === 0) return;

  const blob = new Blob([JSON.stringify(prs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
