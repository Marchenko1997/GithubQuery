import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Issue, RepoInfo, IssueResponse, RepoResponse } from "./types"; 

const BASE_URL = "https://api.github.com";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/vnd.github.v3+json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getIssues: builder.query<Issue[], string>({
      query: (repoUrl) => {
        const [, owner, repo] =
          repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || [];
        if (!owner || !repo) throw new Error("Invalid URL format");

        return `/repos/${owner}/${repo}/issues?per_page=100`;
      },

      transformResponse: (response: IssueResponse[]): Issue[] => {
        return response.map((issue) => ({
          id: issue.id,
          title: issue.title,
          number: issue.number,
          created_at: issue.created_at,
          comments: issue.comments,
          user: { login: issue.user.login },
          state: issue.state,
          assignee: issue.assignee ? { login: issue.assignee.login } : null,
        }));
      },
    }),

    getRepoInfo: builder.query<RepoInfo, string>({
      query: (repoUrl) => {
        const [, owner, repo] =
          repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || [];
        if (!owner || !repo) throw new Error("Invalid URL format");
        return `/repos/${owner}/${repo}`;
      },

      transformResponse: (response: RepoResponse): RepoInfo => ({
        fullName: response.full_name,
        htmlUrl: response.html_url,
        owner: response.owner.login,
        ownerUrl: response.owner.html_url,
        stars: response.stargazers_count,
      }),
    }),
  }),
});

export const { useGetIssuesQuery, useGetRepoInfoQuery } = githubApi;
