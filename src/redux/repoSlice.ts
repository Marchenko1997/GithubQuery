import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RepoState {
  url: string;
}

const initialState: RepoState = {
  url: "",
};

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepoUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setRepoUrl } = repoSlice.actions;
export default repoSlice.reducer;
