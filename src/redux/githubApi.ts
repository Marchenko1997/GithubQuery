import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    getIssues: builder.query({
      query: (repoUrl: string) => {
        const [, owner, repo] = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || [];
        if (!owner || !repo) throw new Error("Invalid URL format");
        return `/repos/${owner}/${repo}/issues?per_page=100`;
      },
    }),
  }),
});

export const { useGetIssuesQuery } = githubApi;
