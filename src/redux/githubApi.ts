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
        const [, owner, repo] =
          repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || [];
        if (!owner || !repo) throw new Error("Invalid URL format");

        return `/repos/${owner}/${repo}/issues?per_page=100`;
      },

      // 🛠️ Преобразуем API-ответ в удобный формат
      transformResponse: (response: any[]) => {
        return response.map((issue) => ({
          id: issue.id,
          title: issue.title,
          number: issue.number,
          created_at: issue.created_at,
          comments: issue.comments,
          user: issue.user.login,
        }));
      },
    }),
    getRepoInfo: builder.query({
      query: (repoUrl: string) => {
        const [, owner, repo] =
          repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || [];
        if (!owner || !repo) throw new Error("Invalid URL format");
        return `/repos/${owner}/${repo}`;
      },
      transformResponse: (response: any) => ({
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
