const API_BASE = "https://api.github.com";

export type GithubConfig = {
  owner: string;
  repo: string;
  branch: string;
  token: string;
};

export function getGithubConfig(): GithubConfig {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_CONTENT_BRANCH || "content";
  if (!owner || !repo || !token) {
    throw new Error("Missing GITHUB_OWNER / GITHUB_REPO / GITHUB_TOKEN");
  }
  return { owner, repo, branch, token };
}

type GithubFileResponse = {
  sha: string;
  content: string;
  encoding: string;
};

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "drone-admin",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function contentUrl(cfg: GithubConfig, path: string): string {
  const clean = path.replace(/^\/+/, "");
  const query = new URLSearchParams({ ref: cfg.branch });
  return `${API_BASE}/repos/${cfg.owner}/${cfg.repo}/contents/${clean}?${query.toString()}`;
}

export async function readJsonFile<T>(path: string, fallback: T): Promise<{ data: T; sha?: string }> {
  const cfg = getGithubConfig();
  const res = await fetch(contentUrl(cfg, path), { headers: headers(cfg.token) });
  if (res.status === 404) return { data: fallback };
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub read failed (${res.status}): ${body}`);
  }
  const file = (await res.json()) as GithubFileResponse;
  const raw = Buffer.from(file.content, "base64").toString("utf8");
  return { data: JSON.parse(raw) as T, sha: file.sha };
}

export async function writeJsonFile(path: string, data: unknown, message: string): Promise<void> {
  const cfg = getGithubConfig();
  const current = await readJsonFile<unknown>(path, null);
  const body = {
    message,
    content: Buffer.from(JSON.stringify(data, null, 2), "utf8").toString("base64"),
    branch: cfg.branch,
    sha: current.sha,
  };
  const res = await fetch(contentUrl(cfg, path), {
    method: "PUT",
    headers: { ...headers(cfg.token), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${text}`);
  }
}
