import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepoInfoState } from "./types"; // ✅ Импортируем тип

const initialState: RepoInfoState = {
  fullName: "",
  htmlUrl: "",
  owner: "",
  ownerUrl: "",
  stars: 0,
};

const repoInfoSlice = createSlice({
  name: "repoInfo",
  initialState,
  reducers: {
    setRepoInfo: (state, action: PayloadAction<RepoInfoState>) => {
      return action.payload;
    },
    clearRepoInfo: () => initialState,
  },
});

export const { setRepoInfo, clearRepoInfo } = repoInfoSlice.actions;
export default repoInfoSlice.reducer;
