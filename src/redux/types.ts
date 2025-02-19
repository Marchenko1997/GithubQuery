export interface Issue {
  id: number;
  title: string;
  number: number;
  created_at: string;
  comments: number;
  user: { login: string };
  state: "open" | "closed";
  assignee?: { login: string } | null;
}

// 🔹 Интерфейс для информации о репозитории
export interface RepoInfo {
  fullName: string;
  htmlUrl: string;
  owner: string;
  ownerUrl: string;
  stars: number;
}

// 🔹 Оригинальные структуры ответов от GitHub API
export interface IssueResponse {
  id: number;
  title: string;
  number: number;
  created_at: string;
  comments: number;
  user: { login: string };
  state: "open" | "closed";
  assignee?: { login: string } | null;
}

export interface RepoResponse {
  full_name: string;
  html_url: string;
  owner: { login: string; html_url: string };
  stargazers_count: number;
}

export interface IssuesState {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
}

export interface RepoInfo {
  fullName: string;
  htmlUrl: string;
  owner: string;
  ownerUrl: string;
  stars: number;
}

// 🔹 Интерфейс для состояния информации о репозитории
export interface RepoInfoState {
  fullName: string;
  htmlUrl: string;
  owner: string;
  ownerUrl: string;
  stars: number;
}

// 🔹 Интерфейс для состояния текущего репозитория
export interface RepoState {
  url: string;
}